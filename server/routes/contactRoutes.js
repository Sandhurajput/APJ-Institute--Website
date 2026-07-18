import express from "express";
import { getSheetEntries, submitContactForm } from "../controllers/contactController.js";
import validateContact from "../middleware/validateContact.js";

const router = express.Router();

// GET /api/contact/sheet-data
router.get("/sheet-data", getSheetEntries);

// POST /api/contact
router.post("/", validateContact, submitContactForm);

export default router;