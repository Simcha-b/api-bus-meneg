import pool from "../connection.js";

//select
async function getAllCompanies() {
  const [rows] = await pool.query("SELECT * FROM bus_companies");
  return rows;
}

async function getCompanyById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM bus_companies WHERE company_id = ?",
    [id]
  );
  return rows[0];
}

//insert
async function insertCompany(company) {
  const [rows] = await pool.query(
    "INSERT INTO bus_companies (company_name, contact_name, phone, email) values(?,?,?,?)",
    [company.company_name, company.contact_name, company.phone, company.email]
  );
  return rows;
}

//update
async function updateCompany(company) {
  const [rows] = await pool.query(
    "UPDATE bus_companies SET company_name = ?, contact_name = ?, phone = ?, email = ? WHERE company_id = ?",
    [
      company.company_name,
      company.contact_name,
      company.phone,
      company.email,
      company.company_id,
    ]
  );
  return rows;
}
//delete
async function deleteCompany(id) {
  const [rows] = await pool.query(
    "DELETE FROM bus_companies WHERE company_id = ?",
    [id]
  );
  return rows;
}

export default {
  getAllCompanies,
  getCompanyById,
  insertCompany,
  updateCompany,
  deleteCompany,
};
