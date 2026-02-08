import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [],
  totalAmount: Number,
  status: {
  type: String,
  enum: ["PENDING", "PAID"],
  default: "PENDING",
},

});

export default mongoose.model("Order", orderSchema);



// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     products: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     paymentStatus: {
//       type: String,
//       default: "pending",
//       enum: ["pending", "paid", "failed"],
//     },
//     orderStatus: {
//       type: String,
//       default: "processing",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);
