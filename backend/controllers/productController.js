import Product from "../models/Product.js";


/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      // image: `/uploads/products/${req.file.filename}`,
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : null,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};


/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.quantity = req.body.quantity || product.quantity;

  if (req.file) {
    product.image = `/uploads/products/${req.file.filename}`;
  }

  const updated = await product.save();
  res.json(updated);
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
};
