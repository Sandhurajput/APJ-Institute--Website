import { createAdmin, findAdminByEmail } from '../models/adminModel.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateToken } from '../config/jwt.js';

const normalizeEmail = (email) => email.trim().toLowerCase();

const sanitizeAdmin = (admin) => {
  const { password, ...safeAdmin } = admin;
  return safeAdmin;
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingAdmin = await findAdminByEmail(normalizedEmail);

    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'An admin with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const admin = await createAdmin({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'admin',
    });

    const token = generateToken({ id: admin.id, email: admin.email, role: 'admin' });

    return res.status(201).json({
      success: true,
      message: 'Admin signup successful',
      token,
      user: sanitizeAdmin(admin),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const normalizedEmail = normalizeEmail(email);
    const admin = await findAdminByEmail(normalizedEmail);

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken({ id: admin.id, email: admin.email, role: 'admin' });

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      user: sanitizeAdmin(admin),
    });
  } catch (error) {
    next(error);
  }
};
