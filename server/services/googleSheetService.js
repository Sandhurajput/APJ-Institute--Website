import { google } from "googleapis";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

let sheetsClient = null;
const REQUIRED_HEADERS = ["Timestamp", "Name", "Email", "Phone", "Subject", "Message"];

const getSheetsClient = () => {
  if (sheetsClient) {
    return sheetsClient;
  }

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets credentials are not configured");
  }

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
  const appScriptUrl = process.env.GOOGLE_APP_SCRIPT_URL;

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
      console.error("Google Apps Script POST error:", detail);
      throw new Error(detail);
    }
  }

  try {
    // Initialize the Google Sheets client once and reuse it for subsequent submissions.
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

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
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
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