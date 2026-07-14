import { query } from '../config/db.js';

export const createInquiry = async ({ name, email, phone, subject, message }) => {
  const [result] = await query(
    'INSERT INTO inquiries (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, subject, message]
  );
  return result.insertId;
};

export const getAllInquiries = async (status = null, limit = 50, offset = 0) => {
  let sql = 'SELECT * FROM inquiries';
  const params = [];

  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const [rows] = await query(sql, params);
  return rows || [];
};

export const getInquiryCount = async (status = null) => {
  let sql = 'SELECT COUNT(*) as count FROM inquiries';
  const params = [];

  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  const [rows] = await query(sql, params);
  return rows[0]?.count || 0;
};

export const getInquiryById = async (id) => {
  const [rows] = await query('SELECT * FROM inquiries WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const updateInquiryStatus = async (id, status) => {
  const [result] = await query(
    'UPDATE inquiries SET status = ? WHERE id = ?',
    [status, id]
  );
  return result.affectedRows > 0;
};

export const deleteInquiry = async (id) => {
  const [result] = await query('DELETE FROM inquiries WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
