import express from "express";
const router = express.Router();
import { getUserById } from "../controllers/usersControllers.js";

router.get("/:id", getUserById);
export default router;
