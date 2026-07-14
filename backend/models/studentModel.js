import { query } from '../config/db.js';

export const findStudentByEmail = async (email) => {
  const [rows] = await query('SELECT id, name, email, phone, password, course, created_at FROM students WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
};

export const findStudentById = async (id) => {
  const [rows] = await query('SELECT id, name, email, phone, password, course, created_at FROM students WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const createStudent = async ({ name, email, phone, password, course }) => {
  const [result] = await query('INSERT INTO students (name, email, phone, password, course) VALUES (?, ?, ?, ?, ?)', [name, email, phone, password, course]);
  return findStudentById(result.insertId);
};
