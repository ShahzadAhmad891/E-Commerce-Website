import express from "express";
import {
  adminLogin,
  adminRegister,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  adminDeleteProduct,
} from "../controllers/adminController.js";

const router = express.Router();

/* AUTH */
router.post("/login", adminLogin);
router.post("/register", adminRegister);

/* DASHBOARD */
router.get("/dashboard", protect, isAdmin, getDashboardStats);


/* ORDERS */
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/orders/:id", protect, isAdmin, updateOrderStatus);

/* USERS */
router.get("/users", protect, isAdmin, getAllUsers);

/* PRODUCTS */
router.delete("/products/:id", protect, isAdmin, adminDeleteProduct);

export default router;


// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { isAdmin } from "../middleware/roleMiddleware.js";
// import {
//   getDashboardStats,
//   getAllOrders,
//   updateOrderStatus,
//   getAllUsers,
//   adminDeleteProduct,
// } from "../controllers/adminController.js";

// const router = express.Router();

// /* DASHBOARD */
// router.get("/dashboard", protect, isAdmin, getDashboardStats);

// /* ORDERS */
// router.get("/orders", protect, isAdmin, getAllOrders);
// router.put("/orders/:id", protect, isAdmin, updateOrderStatus);

// /* USERS */
// router.get("/users", protect, isAdmin, getAllUsers);

// /* PRODUCTS */
// router.delete("/products/:id", protect, isAdmin, adminDeleteProduct);

// export default router;
