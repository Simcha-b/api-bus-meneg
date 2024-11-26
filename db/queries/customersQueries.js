import pool from "../connection.js";

//select
// async function getAllCustomers() {
//   const [customers] = await pool.query("SELECT * FROM customers");

//   for (const customer of customers) {
//     const [contacts] = await pool.query(
//       "SELECT * FROM contacts WHERE customer_id = ?",
//       [customer.customer_id]
//     );
//     customer.contacts = contacts;
//   }
//   return customers;
// }
// async function getAllCustomers() {
//   const [rows] = await pool.query("SELECT * FROM customers");
//   return rows;
// }

async function getCustomerById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM customers WHERE customer_id = ?",
    [id]
  );
  return rows[0];
}

//select all customers with their contacts with payment details 
async function getAllCustomers() {
  const [customers] = await pool.query("SELECT * FROM customers");

  for (const customer of customers) {
    const [contacts] = await pool.query(
      "SELECT * FROM contacts WHERE customer_id = ?",
      [customer.customer_id]
    );
    customer.contacts = contacts;

    for (const contact of contacts) {
      const [orders] = await pool.query(
        "SELECT * FROM orders WHERE contact_id = ?",
        [contact.contact_id]
      );
      contact.orders = orders;
    }
  }
  return customers;
}




//insert new customer with contacts
async function insertCustomerWithContacts(customer, contacts) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [customerResult] = await connection.query(
      "INSERT INTO customers (name, phone, email) values(?,?,?)",
      [customer.name, customer.phone, customer.email]
    );

    const customerId = customerResult.insertId;

    for (const contact of contacts) {
      await connection.query(
        "INSERT INTO contacts (name, contact_phone, contact_email, customer_id) values(?,?,?,?)",
        [contact.name, contact.phone, contact.email, customerId]
      );
    }

    await connection.commit();
    return customerResult;
  } catch (error) {
    connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
async function insertCustomer(customer) {
  const [rows] = await pool.query(
    "INSERT INTO customers (institution_name, contact_person, phone, email) values(?,?,?,?)",
    [customer.name, customer.contact_person, customer.phone, customer.email]
  );
  return rows;
}

//update
async function updateCustomer(customer) {
  const [rows] = await pool.query(
    "UPDATE customers SET institution_name = ?, contact_person = ?, phone = ?, email = ? WHERE customer_id = ?",
    [
      customer.name,
      customer.contact_person,
      customer.phone,
      customer.email,
      customer.customer_id,
    ]
  );
  return rows;
}

//delete
async function deleteCustomer(id) {
  const [rows] = await pool.query(
    "DELETE FROM customers WHERE customer_id = ?",
    [id]
  );
  return rows;
}
export default {
  getAllCustomers,
  getCustomerById,
  insertCustomerWithContacts,
  updateCustomer,
  deleteCustomer,
};
