import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Payment from "../models/Payment.js";

/* ================= DASHBOARD STATS ================= */
export const getDashboardStats = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Payment.aggregate([
    { $match: { status: "success" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  res.json({
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
  });
};

/* ================= GET ALL ORDERS ================= */
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};

/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).json({ message: "Order not found" });

  order.orderStatus = req.body.status || order.orderStatus;
  await order.save();

  res.json({ message: "Order status updated", order });
};

/* ================= GET ALL USERS ================= */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* ================= DELETE PRODUCT (ADMIN PANEL) ================= */
export const adminDeleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  await product.deleteOne();
  res.json({ message: "Product removed by admin" });
};
