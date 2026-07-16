import db from "../config/db.js";
import { addToGoogleSheet } from "../services/googleSheetService.js";

export const submitContactForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const sql = `
    INSERT INTO contacts
    (name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, subject, message],
    async (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      // Save inquiry to Google Sheet
      try {
        await addToGoogleSheet({
          name,
          email,
          phone,
          subject,
          message,
          date: new Date().toISOString(),
        });
      } catch (error) {
        console.log("Google Sheet Sync Failed");
      }

      res.status(201).json({
        success: true,
        message: "Message Sent Successfully",
      });
    }
  );
};