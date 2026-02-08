import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getProducts);

/* ADMIN */
router.post("/", protect, isAdmin, upload.single("image"), createProduct);
router.put("/:id", protect, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;



// import express from "express";
// const router = express.Router();
// import upload from "../middleware/uploadMiddleware.js";
// import Product from "../models/Product.js";


// // CREATE PRODUCT (ADMIN)
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { name, description, price, quantity } = req.body;

//     const product = new Product({
//       name,
//       description,
//       price,
//       quantity,
//       image: req.file
//         ? `/uploads/products/${req.file.filename}`
//         : null,
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET PRODUCTS
// router.get("/", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // module.exports = router;
// export default router;
