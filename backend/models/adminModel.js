import { query } from '../config/db.js';

export const findAdminByEmail = async (email) => {
  const [rows] = await query('SELECT id, name, email, password, role, createdAt FROM admins WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
};

export const findAdminById = async (id) => {
  const [rows] = await query('SELECT id, name, email, password, role, createdAt FROM admins WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const createAdmin = async ({ name, email, password, role }) => {
  const [result] = await query('INSERT INTO admins (name, email, password, role, updatedAt) VALUES (?, ?, ?, ?, NOW())', [name, email, password, role]);
  return findAdminById(result.insertId);
};
