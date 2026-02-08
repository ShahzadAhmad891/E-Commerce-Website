// backend/controllers/orderController.js

import User from "../models/User.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    // 🔒 Validate input
    if (!name || !phone || !email || !address) {
      return res.status(400).json({
        message: "All contact fields are required",
      });
    }

    // 🔒 Check cart
    const cart = req.session.cart;
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // 👤 Find or create user (FIXES DUPLICATE EMAIL ERROR)
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        phone,
        email,
        address,
      });
    } else {
      // Update info if user already exists
      user.name = name;
      user.phone = phone;
      user.address = address;
      await user.save();
    }

    // 🧾 Create order
    const order = await Order.create({
      user: user._id,
      items: cart.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: cart.totalPrice,
      status: "PENDING",
    });

    // 🧹 Clear cart
    req.session.cart = null;

    res.status(201).json(order);
  } catch (err) {
    console.error("🔥 Create order error:", err.message);
    res.status(500).json({
      message: err.message, // <-- SHOW REAL ERROR
    });
  }
};



// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";

// /* ================= CREATE ORDER SUMMARY ================= */
// export const createOrder = async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id });

//   if (!cart || cart.items.length === 0)
//     return res.status(400).json({ message: "Cart is empty" });

//   const order = await Order.create({
//     user: req.user._id,
//     products: cart.items,
//     totalAmount: cart.totalPrice,
//   });

//   res.status(201).json(order);
// };
