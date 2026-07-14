import express from 'express';
import {
  submitInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  removeInquiry,
} from '../controllers/inquiryController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public endpoint - anyone can submit inquiry
router.post('/submit', submitInquiry);

// Protected endpoints - only admins can view/manage inquiries
router.get('/', authenticateToken, requireRole('admin'), getInquiries);
router.get('/:id', authenticateToken, requireRole('admin'), getInquiry);
router.put('/:id', authenticateToken, requireRole('admin'), updateInquiry);
router.delete('/:id', authenticateToken, requireRole('admin'), removeInquiry);

export default router;
