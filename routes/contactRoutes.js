import express from "express";
const router = express.Router();

import {
    getAllContacts,
    getContactById,
    getContactsByCustomerId,
    insertContactIntoCustomer,
    updateContact,
    deleteContact,
} from "../controllers/contactControllers.js";

router.get("/customer_id", getContactsByCustomerId);

router.get("/", getAllContacts);
router.get("/:id", getContactById);

router.post("/", insertContactIntoCustomer);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;


