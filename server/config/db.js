import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 30000,
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

export const executeQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.execute(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

export default db;