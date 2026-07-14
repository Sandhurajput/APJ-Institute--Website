import { createStudent, findStudentByEmail } from '../models/studentModel.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateToken } from '../config/jwt.js';

const normalizeEmail = (email) => email.trim().toLowerCase();

const sanitizeStudent = (student) => {
  const { password, ...safeStudent } = student;
  return safeStudent;
};

const getStudentName = (body) => {
  if (body.name && body.name.trim()) {
    return body.name.trim();
  }

  const firstName = body.firstName?.trim() || '';
  const lastName = body.lastName?.trim() || '';
  return `${firstName} ${lastName}`.trim();
};

export const signup = async (req, res, next) => {
  try {
    const name = getStudentName(req.body);
    const { email, password, phone, course } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingStudent = await findStudentByEmail(normalizedEmail);

    if (existingStudent) {
      return res.status(409).json({ success: false, message: 'A student with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const student = await createStudent({
      name,
      email: normalizedEmail,
      phone: phone?.trim() || '',
      password: hashedPassword,
      course: course?.trim() || 'General',
    });

    const token = generateToken({ id: student.id, email: student.email, role: 'student' });

    return res.status(201).json({
      success: true,
      message: 'Student signup successful',
      token,
      user: sanitizeStudent(student),
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
    const student = await findStudentByEmail(normalizedEmail);

    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePassword(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken({ id: student.id, email: student.email, role: 'student' });

    return res.status(200).json({
      success: true,
      message: 'Student login successful',
      token,
      user: sanitizeStudent(student),
    });
  } catch (error) {
    next(error);
  }
};
