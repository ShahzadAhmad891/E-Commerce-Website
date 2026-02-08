import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    method: {
      type: String,
      enum: ["EASYPAISA", "JAZZCASH"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);





// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//   order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
//   amount: Number,
//   status: String,
// });

// export default mongoose.model("Payment", paymentSchema);





// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema(
//   {
//     order: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     method: {
//       type: String,
//       enum: ["stripe", "easypaisa"],
//       required: true,
//     },
//     amount: { type: Number, required: true },
//     currency: { type: String, default: "PKR" },
//     status: {
//       type: String,
//       enum: ["pending", "success", "failed"],
//       default: "pending",
//     },
//     transactionId: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Payment", paymentSchema);
