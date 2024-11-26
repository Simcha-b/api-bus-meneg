import pool from "../connection.js";
//select

async function getUser(id) {
  const [rows] = await pool.query("SelECT * FROM users where email = ?", [id]);
  return rows;
}

export { getUser };
