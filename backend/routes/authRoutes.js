import express from "express";
import {
  adminRegister,
  adminLogin,
  userRegister,
  userLogin,
} from "../controllers/authController.js";

const router = express.Router();

/* ADMIN */
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);

/* USER */
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);

// router.post("/register", registerUser);
// router.post("/login", loginUser);


export default router;


