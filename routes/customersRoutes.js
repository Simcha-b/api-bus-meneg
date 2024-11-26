import express from "express";
const router = express.Router();
import {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customersControllers.js";

router.get("/", getCustomers);
router.get("/:id", getCustomer);

router.post("/", insertCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
