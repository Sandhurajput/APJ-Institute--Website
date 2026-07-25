import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  passwordLength: process.env.DB_PASSWORD?.length,
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 30000,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("CONNECTED");
  }
});

export default db;