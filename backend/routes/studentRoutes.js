import { Router } from 'express';
import { login, signup } from '../controllers/studentController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, requireRole('student'), (req, res) => {
  res.status(200).json({ success: true, message: 'Student profile accessible', user: req.user });
});

export default router;
