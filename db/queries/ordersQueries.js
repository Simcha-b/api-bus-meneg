import pool from "../connection.js";

//select
async function getAllOrders() {
  const [rows] =
    // await pool.query(`SELECT * FROM orders, customers, bus_companies
    //  WHERE orders.customer_id = customers.customer_id AND orders.company_id = bus_companies.company_id`);
    await pool.query(`
SELECT o.*, c.name as customer_name, con.name as contact_name, b.company_name
FROM orders as o
LEFT JOIN customers as c
ON o.customer_id = c.customer_id
LEFT JOIN contacts as con
ON o.contact_id = con.id 
LEFT JOIN bus_companies as b
ON o.company_id = b.company_id`);
  return rows;
}

async function getOrderById(id) {
  const [rows] = await pool.query("SELECT * FROM orders WHERE order_id = ?", [
    id,
  ]);
  return rows[0];
}

async function getOrdersByCustomerId(id) {
  const query = `SELECT * FROM orders
  JOIN customers
  ON orders.customer_id = customers.customer_id WHERE customers.customer_id = ?`;

  const [rows] = await pool.query(query, [id]);
  return rows;
}
//select orders by company id
async function getOrdersByCompanyId(id) {
  const query = `SELECT * FROM orders WHERE company_id = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows;
}

// select future orders
async function getFutureOrders() {
  const query = `SELECT o.*, c.name as customer_name, con.name as contact_name, b.company_name
FROM orders as o
LEFT JOIN customers as c
ON o.customer_id = c.customer_id
LEFT JOIN contacts as con
ON o.contact_id = con.id 
LEFT JOIN bus_companies as b
ON o.company_id = b.company_id
    WHERE order_date > CURDATE()`;
  const [rows] = await pool.query(query);
  return rows;
}
//select orders by date
async function getOrderByDate(year, month) {
  const [rows] = await pool.query(
    `SELECT o.*, c.name as customer_name, con.name as contact_name, b.company_name
FROM orders as o
LEFT JOIN customers as c
ON o.customer_id = c.customer_id
LEFT JOIN contacts as con
ON o.contact_id = con.id 
LEFT JOIN bus_companies as b
ON o.company_id = b.company_id
     where year(order_date) = ? and month(order_date) = ?`,
    [year, month]
  );
  return rows;
}

// insert
async function insertOrder(order) {
  const entries = Object.entries(order);
  const keys = entries.map(([key]) => key).join(", ");
  const placeholders = entries.map(() => "?").join(", ");
  const values = entries.map(([, value]) => value);
  const query = `INSERT INTO orders (${keys}) VALUES (${placeholders})`;
  const [rows] = await pool.query(query, values);
  return rows;
}

//update

async function updateOrder(id, updates) {
  // Ensure we have an id and updates
  if (!id || Object.keys(updates).length === 0) {
    throw new Error(
      "Invalid input: id is required and updates object cannot be empty"
    );
  }
  // Create the SET part of the query dynamically
  const setClause = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(updates);

  // Add the id to the values array
  values.push(id);

  const query = `UPDATE orders SET ${setClause} WHERE order_id = ?`;

  try {
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      throw new Error("No order found with the given id");
    }

    return { success: true, message: "order updated successfully" };
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

//update order status
async function updateOrderStatus(order_id, status) {
  const query = `UPDATE orders SET status = ? WHERE order_id = ?`;
  const result = await pool.query(query, [status, order_id]);
  return result;
}
//delete

async function deleteOrder(id) {
  const [result] = await pool.query("DELETE FROM orders WHERE order_id = ?", [
    id,
  ]);

  return result;
}

export default {
  getAllOrders,
  getOrderById,
  getFutureOrders,
  getOrderByDate,
  getOrdersByCustomerId,
  getOrdersByCompanyId,
  insertOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};
