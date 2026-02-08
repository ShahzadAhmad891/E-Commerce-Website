import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { isUser } from "../middleware/roleMiddleware.js";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

// router.post("/add", protect, isUser, addToCart);
router.post("/add", addToCart);
// router.get("/", protect, isUser, getCart);
router.get("/", getCart);
// router.put("/update", protect, isUser, updateQuantity);
router.put("/update", updateQuantity);
// router.delete("/remove/:productId", protect, isUser, removeFromCart);
router.delete("/remove/:productId", removeFromCart);

export default router;
