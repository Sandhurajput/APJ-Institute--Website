import express from "express";

const router = express.Router();

import { submitContactForm } from "../controllers/contactController.js";

import validateContact from "../middleware/validateContact.js";

router.post(
  "/contact",
  validateContact,
  submitContactForm
);

export default router;