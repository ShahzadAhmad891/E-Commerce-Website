import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isUser } from "../middleware/roleMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

// router.post("/", protect, isUser, createOrder);
router.post("/", createOrder);

export default router;
