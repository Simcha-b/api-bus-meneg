import express from "express";
const router = express.Router();
import { loginUser } from "../controllers/usersControllers.js";
// import { getUserById } from "../controllers/usersControllers.js";

// router.get("/:id", getUserById);
router.post("/login", loginUser);
export default router;
