import { getPrismaClient } from "../config/database.js";
import { appendToSheet, readFromSheet } from "../services/googleSheetService.js";

const prisma = getPrismaClient();

export const getSheetEntries = async (req, res) => {
  try {
    const data = await readFromSheet();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Google Sheets read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch data from Google Sheet",
    });
  }
};

export const submitContactForm = async (req, res) => {
  try {
    // 1. Validate and normalize the incoming request payload.
    const { name, email, phone, subject, message } = req.body;

    // 2. Save the inquiry to MySQL using Prisma first.
    const contact = await prisma.contact.create({
      data: {
        name: (name || "").trim(),
        email: (email || "").trim().toLowerCase(),
        phone: phone || "",
        subject: subject || "",
        message: message || "",
      },
    });

    // 3. Append the same inquiry to Google Sheets in the background.
    let sheetSyncError = null;
    try {
      await appendToSheet({
        createdAt: new Date().toISOString(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject || "",
        message: contact.message,
      });
    } catch (sheetError) {
      // 4. Do not fail the API request if Google Sheets is unavailable.
      sheetSyncError = sheetError.message;
      console.error("Google Sheets integration failed, continuing request:", sheetSyncError);
    }

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      warning: sheetSyncError ? "Sheet sync failed; the inquiry was stored locally but not written to Google Sheets." : undefined,
      sheetSyncError: sheetSyncError || undefined,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit inquiry",
    });
  }
};