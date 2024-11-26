import customersQueries from "../db/queries/customersQueries.js";

async function getCustomers(req, res) {
  try {
    const customers = await customersQueries.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving customers",
      error: error.message || "Internal Server Error",
    });
  }
}

async function getCustomer(req, res) {
  const userId = req.params.id;
  try {
    const customer = await customersQueries.getCustomerById(userId);
    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(customer);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving customer",
      error: error.message || "Internal Server Error",
    });
  }
}

async function insertCustomer(req, res) {
  const customer = req.body;
  const contacts = req.body.contacts;
  try {
    const newCustomer = await customersQueries.insertCustomerWithContacts(customer, contacts);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting customer",
      error: error.message || "Internal Server Error",
    });
  }
}

async function updateCustomer(req, res) {
  const customerId = req.params.id;
  const updates = req.body;
  try {
    const updatedCustomer = await customersQueries.updateCustomer(
      customerId,
      updates
    );
    if (!updatedCustomer) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(updatedCustomer);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating customer",
      error: error.message || "Internal Server Error",
    });
  }
}

async function deleteCustomer(req, res) {
  const customerId = req.params.id;
  try {
    const deletedCustomer = await customersQueries.deleteCustomer(customerId);
    if (!deletedCustomer) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(deletedCustomer);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting customer",
      error: error.message || "Internal Server Error",
    });
  }
}
export {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
