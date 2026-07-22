import { executeQuery } from "../config/db.js";
import { appendToSheet, readFromSheet } from "../services/googleSheetService.js";

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
    const { name, email, phone, subject, message } = req.body;

    await executeQuery(
      "INSERT INTO `contacts` (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [
        (name || "").trim(),
        (email || "").trim().toLowerCase(),
        (phone || "").trim(),
        (subject || "General Inquiry").trim(),
        (message || "").trim(),
      ]
    );

    const contactRows = await executeQuery(
      "SELECT * FROM contacts WHERE id = LAST_INSERT_ID() LIMIT 1"
    );

    const contact = contactRows[0];

    let sheetSyncError = null;

    try {
      await appendToSheet({
        createdAt: new Date().toISOString(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
      });
    } catch (sheetError) {
      sheetSyncError = sheetError.message;
      console.error("Google Sheets sync failed:", sheetSyncError);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      warning: sheetSyncError
        ? "Saved in database but Google Sheet sync failed."
        : undefined,
    });
  } catch (error) {
    console.error("Contact submission failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save your inquiry right now. Please try again later.",
    });
  }
};