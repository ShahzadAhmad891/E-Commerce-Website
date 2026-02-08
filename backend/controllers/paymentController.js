import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

export const payNow = async (req, res) => {
  try {
    const { orderId, transactionId, amount } = req.body;

    // 🔒 VALIDATION (CRITICAL)
    if (!orderId || !transactionId || !amount) {
      return res.status(400).json({
        message: "Missing payment data",
      });
    }

    // 🔒 Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    // 🔍 Check order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 🧾 Create payment
    const payment = await Payment.create({
      order: order._id,
      method: "EASYPAISA",
      transactionId,
      amount,
      status: "SUCCESS",
    });

    // ✅ Update order status
    order.status = "PAID";
    await order.save();

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("🔥 Payment error:", error.message);
    res.status(500).json({
      message: error.message, // <-- show REAL error now
    });
  }
};


// backend/controllers/paymentController.js

// import Payment from "../models/Payment.js";
// import Order from "../models/Order.js";

// export const payNow = async (req, res) => {
//   try {
//     const { orderId, transactionId, amount } = req.body;

//     // Optional but recommended: verify order exists
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const payment = await Payment.create({
//       order: orderId,
//       method: "EASYPAISA",
//       transactionId,
//       amount,
//       status: "SUCCESS",
//     });

//     // Update order status after payment
//     order.status = "PAID";
//     await order.save();

//     res.status(201).json(payment);
//   } catch (error) {
//     console.error("Payment error:", error);
//     res.status(500).json({ message: "Payment failed AGAIN Shahzad" });
//   }
// };


// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import Payment from "../models/Payment.js";
// import Cart from "../models/Cart.js";
// import { sendEmail } from "../utils/sendEmail.js";
// import { sendSMS } from "../utils/sendSMS.js";

// /* ================= STRIPE PAYMENT ================= */

// export const stripePayment = async (req, res) => {
//   try {
//     if (!process.env.STRIPE_SECRET_KEY) {
//       return res.status(500).json({ message: "Stripe key not configured" });
//     }

//     // ✅ Initialize Stripe INSIDE handler (CRITICAL FIX)
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     const { orderId, token } = req.body;

//     const order = await Order.findById(orderId).populate("user");
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // ⚠ Stripe does NOT support PKR — using USD for test mode
//     const charge = await stripe.charges.create({
//       amount: Math.round(order.totalAmount * 100),
//       currency: "usd",
//       source: token,
//       description: `Order ${order._id}`,
//     });

//     const payment = await Payment.create({
//       order: order._id,
//       user: order.user._id,
//       method: "stripe",
//       amount: order.totalAmount,
//       status: "success",
//       transactionId: charge.id,
//     });

//     order.paymentStatus = "paid";
//     await order.save();

//     await Cart.deleteOne({ user: order.user._id });

//     sendEmail(order.user.email, "Order Confirmed", "Your payment was successful");
//     sendSMS(order.user.phone || "0000000000", "Order confirmed!");

//     res.json({ message: "Payment successful", payment });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= EASYPaisa ================= */

// export const easypaisaPayment = async (req, res) => {
//   try {
//     const { orderId, transactionId } = req.body;

//     const order = await Order.findById(orderId).populate("user");
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     const payment = await Payment.create({
//       order: order._id,
//       user: order.user._id,
//       method: "easypaisa",
//       amount: order.totalAmount,
//       status: "success",
//       transactionId,
//     });

//     order.paymentStatus = "paid";
//     await order.save();

//     await Cart.deleteOne({ user: order.user._id });

//     sendEmail(order.user.email, "Order Confirmed", "Easypaisa payment received");
//     sendSMS(order.user.phone || "0000000000", "Order confirmed");

//     res.json({ message: "Easypaisa payment successful", payment });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import Payment from "../models/Payment.js";
// import Cart from "../models/Cart.js";
// import { sendEmail } from "../utils/sendEmail.js";
// import { sendSMS } from "../utils/sendSMS.js";


// /* ================= STRIPE PAYMENT ================= */

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
//  export const stripePayment = async (req, res) => {
//    const { orderId, token } = req.body;

//    const order = await Order.findById(orderId).populate("user");
//    if (!order) return res.status(404).json({ message: "Order not found" });

//    const charge = await stripe.charges.create({
//      amount: order.totalAmount * 100, // PKR -> paisa
//      currency: "pkr",
//      source: token,
//      description: `Order ${order._id}`,
//    });

//    const payment = await Payment.create({
//      order: order._id,
//      user: order.user._id,
//      method: "stripe",
//      amount: order.totalAmount,
//      status: "success",
//      transactionId: charge.id,
//   });

//    order.paymentStatus = "paid";
//    await order.save();

//    await Cart.deleteOne({ user: order.user._id });

// // 🔔 Notifications
//    sendEmail(order.user.email, "Order Confirmed", "Your payment was successful");
//    sendSMS(order.user.phone || "0000000000", "Order confirmed!");

//    res.json({ message: "Payment successful", payment });
//   };

// /* ================= EASYPaisa (SERVER VERIFIED) ================= */
// export const easypaisaPayment = async (req, res) => {
//   const { orderId, transactionId } = req.body;

//   const order = await Order.findById(orderId).populate("user");
//   if (!order) return res.status(404).json({ message: "Order not found" });

//   // 🔴 Here Easypaisa API verification happens
//   // Assume VERIFIED for now

//   const payment = await Payment.create({
//     order: order._id,
//     user: order.user._id,
//     method: "easypaisa",
//     amount: order.totalAmount,
//     status: "success",
//     transactionId,
//   });

//   order.paymentStatus = "paid";
//   await order.save();

//   await Cart.deleteOne({ user: order.user._id });

//   sendEmail(order.user.email, "Order Confirmed", "Easypaisa payment received");
//   sendSMS(order.user.phone || "0000000000", "Easypaisa order confirmed");

//   res.json({ message: "Easypaisa payment successful", payment });
// };
