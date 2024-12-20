import ordersQueries from "../db/queries/ordersQueries.js";
import { calculateDistance } from "../api-maps/fetchMaps.js";
import fetchData from "../api-trafik/traficReports.js";

// Helper function to format dates in responses
async function formatDatesInResponse(data, dateFields = ['order_date']) {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return Promise.all(data.map(item => formatDatesInResponse(item, dateFields)));
  }
  
  if (typeof data === 'object') {
    const formattedData = { ...data };
    for (const field of dateFields) {
      if (formattedData[field]) {
        const date = new Date(formattedData[field]);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        formattedData[field] = `${month}-${day}-${year}`;
      }
    }
    return formattedData;
  }
  
  const date = new Date(data);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

//function to get all orders
async function getOrders(req, res) {
  try {
    const orders = await ordersQueries.getAllOrders();
    const formattedOrders = await formatDatesInResponse(orders);
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get order by id
async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await ordersQueries.getOrderById(orderId);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "order not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      const formattedOrder = await formatDatesInResponse(order);
      res.json(formattedOrder);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get future orders
async function getFutureOrders(req, res) {
  try {
    const futureOrders = await ordersQueries.getFutureOrders();
    const formattedOrders = await formatDatesInResponse(futureOrders);
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get orders by date
async function getOrdersByDate(req, res) {
  const { year, month } = req.query;
  if (!month || !month) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }
  try {
    const orders = await ordersQueries.getOrderByDate(year, month);
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get orders by customer id
async function getOrdersByCustomerId(req, res) {
  const customerId = req.params.id;
  try {
    const orders = await ordersQueries.getOrdersByCustomerId(customerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get orders by company id
async function getOrdersByCompanyId(req, res) {
  const companyId = req.params.id;
  try {
    const orders = await ordersQueries.getOrdersByCompanyId(companyId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to insert orders
async function insertOrders(req, res) {
  const order = req.body;
  try {
    const newOrder = await ordersQueries.insertOrder(order);
    res.status(201).json({
      success: true,
      message: "Order created",
      data: newOrder,
    });
    console.log(newOrder);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting orders",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to update orders
async function updateOrders(req, res) {
  const orderId = req.params.id;
  const updates = req.body;

  try {
    const updatedOrder = await ordersQueries.updateOrder(orderId, updates);
    if (!updatedOrder) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.json(updatedOrder);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to update order status
async function updateOrderStatus(req, res) {
  const orderId = req.params.id;
  const status = req.body.status;

  console.log(`Updating order ${orderId} to status ${status}`); // Log the input values

  try {
    const updatedOrder = await ordersQueries.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      console.log(`Order ${orderId} not found`); // Log if order is not found
      res.status(404).json({
        success: false,
        message: "Order not found",
        error: "Order not found",
      });
    } else {
      console.log(`Order ${orderId} updated successfully`); // Log successful update
      res.json(updatedOrder);
    }
  } catch (error) {
    console.error(`Error updating order ${orderId}: ${error.message}`); // Log the error
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to delete order
async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    const deletedOrder = await ordersQueries.deleteOrder(orderId);
    if (!deletedOrder) {
      res.status(404).json({
        success: false,
        message: "Order not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(deletedOrder);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get distance
async function getDistance(req, res) {
  const locations = req.body.locations;
  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Locations are required and should be a non-empty array",
    });
  }

  try {
    const distance = await calculateDistance(locations);
    res.json(distance);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating distance",
      error: error.message || "Internal Server Error",
    });
  }
}

//function to get traffic reports
async function getTrafficReports(req, res) {
  try {
    const reports = await fetchData();
    res.json(reports);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving reports",
      error: error.message || "Internal Server Error",
    });
  }
}

export {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getOrdersByCompanyId,
  getFutureOrders,
  getOrdersByDate,
  insertOrders,
  updateOrders,
  updateOrderStatus,
  deleteOrder,
  getDistance,
  getTrafficReports,
};
