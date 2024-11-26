import express from "express";
const router = express.Router();
import {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getOrdersByCompanyId,
  getFutureOrders,
  insertOrders,
  updateOrders,
  deleteOrder,
  getOrdersByDate,
  updateOrderStatus,
  getDistance,
  getTrafficReports,
} from "../controllers/ordersControllers.js";
router.get("/byDate", getOrdersByDate);
router.get("/future", getFutureOrders);
// router.get("/calculate-distance", getDistance)

router.post("/calculate-distance", getDistance)
router.get("/traffic-reports", getTrafficReports);

router.get("/customer/:id", getOrdersByCustomerId);
router.get("/company/:id", getOrdersByCompanyId);

router.get("/", getOrders);
router.get("/:id", getOrderById);

router.put("/:id/status", updateOrderStatus);
router.post("/", insertOrders);
router.post("/:id", updateOrders);
router.delete("/:id", deleteOrder);
export default router;
