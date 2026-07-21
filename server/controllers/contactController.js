import { addToGoogleSheet } from "../services/googleSheetService.js";

export const submitContactForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const inquirySubject = (subject || "General Inquiry").trim() || "General Inquiry";

  try {
    await addToGoogleSheet({
      name: (name || "").trim(),
      email: (email || "").trim().toLowerCase(),
      phone: (phone || "").trim(),
      subject: inquirySubject,
      message: (message || "").trim(),
      source: "website-contact-form",
      date: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Inquiry submission failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save your inquiry right now. Please try again later.",
    });
  }
};