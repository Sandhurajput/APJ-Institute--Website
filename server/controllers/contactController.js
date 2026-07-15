import db from "../config/db.js";

export const submitContactForm = (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const sql = `
    INSERT INTO contacts
    (name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, subject, message],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.status(201).json({
        success: true,
        message: "Message Sent Successfully",
      });
    }
  );
};