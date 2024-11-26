import express from "express";
const router = express.Router();
import {
//   getPayments,
//   getPaymentById,
//   getPaymentsByCustomerId,
  createPayment,
//   updatePayments,
//   deletePayment,
} from "../controllers/paymentsControllers.js";

// router.get("/customer/:id", getPaymentsByCustomerId);

// router.get("/", getPayments);
// router.get("/:id", getPaymentById);

router.post("/", createPayment);
// router.put("/:id", updatePayments);
// router.delete("/:id", deletePayment);

export default router;