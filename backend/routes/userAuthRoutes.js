import express from "express";
import {
  userLogin,
  userRegister,
} from "../controllers/authController.js";
 import { protect } from "../middleware/authMiddleware.js";
 import { isUser } from "../middleware/roleMiddleware.js";
// import { getProducts } from "../controllers/productController.js";
// import {
  //   getDashboardStats,
  //   getAllOrders,
  //   updateOrderStatus,
  // getAllUsers,
  //   adminDeleteProduct,
// } from "../controllers/adminController.js";

const router_2 = express.Router();

/* AUTH */
// router_2.post("/login", protect, isUser, userLogin);
router_2.post("/login", userLogin);
// router_2.post("/register",  protect, isUser, userRegister);
router_2.post("/register", userRegister);

// /* DASHBOARD */
// router_2.get("/dashboard", protect, isAdmin, getDashboardStats);


// /* ORDERS */
// router_2.get("/orders", protect, isAdmin, getAllOrders);
// router_2.put("/orders/:id", protect, isAdmin, updateOrderStatus);

// /* USERS */
// router_2.get("/users", protect, isAdmin, getAllUsers);

/* PRODUCTS */
// router_2.get("/products", protect, isAdmin, getProducts);
// router_2.get("/products/:id", protect, isAdmin, adminDeleteProduct);

export default router_2;



// import express from "express";
// import {
//   userRegister,
//   userLogin,
// } from "../controllers/authController.js";

// const router_2= express.Router();

// /* USER */
// router_2.post("/register", userRegister);
// router_2.post("/login", userLogin);

// // router.post("/register", registerUser);
// // router.post("/login", loginUser);


// export default router_2;
