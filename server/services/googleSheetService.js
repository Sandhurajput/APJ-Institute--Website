import { google } from "googleapis";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

let sheetsClient = null;
const REQUIRED_HEADERS = ["Timestamp", "Name", "Email", "Phone", "Subject", "Message"];
const PLACEHOLDER_TOKENS = ["REPLACE", "your_", "changeme"];

const normalizeConfigValue = (value) => (typeof value === "string" ? value.trim() : "");

const isPlaceholderValue = (value) => {
  const normalized = normalizeConfigValue(value);
  if (!normalized) {
    return true;
  }

  return PLACEHOLDER_TOKENS.some((token) => normalized.toLowerCase().includes(token));
};

export const isGoogleSheetsConfigured = (env = process.env) => {
  const clientEmail = normalizeConfigValue(env.GOOGLE_CLIENT_EMAIL);
  const privateKey = normalizeConfigValue(env.GOOGLE_PRIVATE_KEY)?.replace(/\\n/g, "\n");
  const spreadsheetId = normalizeConfigValue(env.GOOGLE_SHEET_ID);

  return Boolean(
    !isPlaceholderValue(clientEmail) &&
      !isPlaceholderValue(privateKey) &&
      !isPlaceholderValue(spreadsheetId)
  );
};

const getConfiguredAppScriptUrl = (env = process.env) => {
  const appScriptUrl = normalizeConfigValue(env.GOOGLE_APP_SCRIPT_URL);
  return isPlaceholderValue(appScriptUrl) ? null : appScriptUrl;
};

const getSheetsClient = () => {
  if (sheetsClient) {
    return sheetsClient;
  }

  if (!isGoogleSheetsConfigured()) {
    throw new Error("Google Sheets credentials are not configured");
  }

  const clientEmail = normalizeConfigValue(process.env.GOOGLE_CLIENT_EMAIL);
  const privateKey = normalizeConfigValue(process.env.GOOGLE_PRIVATE_KEY)?.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
};

const ensureHeaderRow = async (sheets, spreadsheetId) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:F1",
  });

  const existingHeaders = response.data.values?.[0] || [];
  if (existingHeaders.length && existingHeaders.every((value, index) => value === REQUIRED_HEADERS[index])) {
    return;
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Sheet1!A1:F1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [REQUIRED_HEADERS],
    },
  });
};

export const appendToSheet = async (data) => {
  const appScriptUrl = getConfiguredAppScriptUrl();
  const directSheetsConfigured = isGoogleSheetsConfigured();

  if (!appScriptUrl && !directSheetsConfigured) {
    console.warn("Google Sheets integration is disabled because the credentials are missing or still use placeholder values.");
    return {
      success: true,
      skipped: true,
      message: "Google Sheets integration disabled",
    };
  }

  if (appScriptUrl) {
    try {
      const response = await axios.post(appScriptUrl, {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        subject: data.subject || "",
        message: data.message || "",
        timestamp: data.createdAt || new Date().toISOString(),
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      });

      if (response.data?.success === false) {
        throw new Error(response.data?.error || "Google Apps Script reported a failure");
      }

      return response.data;
    } catch (error) {
      const detail = error.response
        ? `status=${error.response.status} body=${JSON.stringify(error.response.data)}`
        : error.message;

      if (!directSheetsConfigured) {
        console.warn("Google Apps Script integration failed and direct Sheets credentials are not configured; skipping sync.", detail);
        return {
          success: true,
          skipped: true,
          message: "Google Sheets integration skipped",
        };
      }

      console.warn("Google Apps Script integration failed; falling back to direct Google Sheets API.", detail);
    }
  }

  try {
    // Initialize the Google Sheets client once and reuse it for subsequent submissions.
    const sheets = getSheetsClient();
    const spreadsheetId = normalizeConfigValue(process.env.GOOGLE_SHEET_ID);

    // Ensure the sheet has the expected header row before appending data.
    await ensureHeaderRow(sheets, spreadsheetId);

    const values = [[
      data.createdAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.subject || "",
      data.message || "",
    ]];

    // Append the inquiry data as a new row in the Google Sheet.
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Google Sheets error:", error.message);
    throw error;
  }
};

export const readFromSheet = async () => {
  if (!isGoogleSheetsConfigured()) {
    console.warn("Google Sheets read skipped because the integration is not configured.");
    return [];
  }

  try {
    const sheets = getSheetsClient();
    const spreadsheetId = normalizeConfigValue(process.env.GOOGLE_SHEET_ID);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:F",
    });

    const rows = (response.data.values || []).slice(1).map((row) => ({
      timestamp: row[0] || "",
      name: row[1] || "",
      email: row[2] || "",
      phone: row[3] || "",
      subject: row[4] || "",
      message: row[5] || "",
    }));

    return rows;
  } catch (error) {
    console.error("Google Sheets read error:", error.message);
    throw error;
  }
};

export const addToGoogleSheet = appendToSheet;