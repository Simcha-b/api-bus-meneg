import pool from "../connection.js";

//select
async function getAllPayments() {
  const [rows] = await pool.query(`SELECT * FROM payments`);
  return rows;
}

//insert
async function insertPayment(payment) {
  const entries = Object.entries(payment);
  const keys = entries.map(([key]) => key).join(", ");
  const placeholders = entries.map(() => "?").join(", ");
  const values = entries.map(([, value]) => value);
  const query = `INSERT INTO payments (${keys}) VALUES (${placeholders})`;
  const [rows] = await pool.query(query, values);
  return rows;
}

export default { getAllPayments, insertPayment };
