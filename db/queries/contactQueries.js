import pool from "../connection.js";

//select
async function getAllContacts() {
  const [rows] = await pool.query("SELECT * FROM contacts");
  return rows;
}

//select
async function getContactById(id) {
  const [rows] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);
  return rows;
}
//select
async function getContactsByCustomerId(id) {
  const [rows] = await pool.query(
    "SELECT * FROM contacts WHERE customer_id = ?",
    [id]
  );
  return rows;
}
//insert
async function insertContact(contact, customerId) {
  const contactData = {
    ...contact,
    customer_id: customerId,
    
  };
  const [rows] = await pool.query("INSERT INTO contacts SET ?", [contactData]);
  return rows;
}
//update
async function updateContact(id, updates) {
  const [rows] = await pool.query(
    "UPDATE contacts SET ? WHERE contact_id = ?",
    [updates, id]
  );
  return rows;
}

//delete
async function deleteContact(id) {
  const [rows] = await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
  return rows;
}

export default {
  getAllContacts,
  getContactById,
  getContactsByCustomerId,
  insertContact,
  updateContact,
  deleteContact,
};
