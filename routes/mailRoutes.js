import express from "express";
const router = express.Router();
import  sendMail  from "../api-mail/SendMail.js";
router.post("/", sendMail);
export default router;