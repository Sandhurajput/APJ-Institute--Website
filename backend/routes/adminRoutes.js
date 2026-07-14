import { Router } from 'express';
import { login, signup } from '../controllers/adminController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, requireRole('admin'), (req, res) => {
  res.status(200).json({ success: true, message: 'Admin profile accessible', user: req.user });
});

export default router;
