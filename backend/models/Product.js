// const mongoose = require("mongoose");
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    // ✅ Image path stored here
    image: { type: String }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Product", productSchema);
export default mongoose.model("Product", productSchema);


// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     image: { type: String, required: true },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);
