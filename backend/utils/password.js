import bcrypt from 'bcryptjs';

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export const hashPassword = (password) => bcrypt.hash(password, saltRounds);
export const comparePassword = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);
