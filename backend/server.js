import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import session from "express-session";

/* ROUTES */
import userAuthRoutes from "./routes/userAuthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";


connectDB();

const app = express();


app.use(
  session({
    secret: "cart_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,      // true only for https
      httpOnly: true,
    },
  })
);

/* MIDDLEWARE */
// app.use(cors());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FILES */
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));


/* API ROUTES */
app.use("/api/admin", adminAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
// app.use("/api/admin", adminAuthRoutes);
app.use("/api/user", userAuthRoutes);



/* DEFAULT */
app.get("/", (req, res) => {
  res.send("E-Commerce API Running...");
});

/* ERROR HANDLER (OPTIONAL BUT RECOMMENDED) */
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// import dotenv from "dotenv";
// // Load environment variables
// dotenv.config();

// import express from "express";

// import mongoose from "mongoose";
// import cors from "cors";
// import path from "path";



// import adminRoutes from "./routes/adminRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";


// // Initialize app
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/products", productRoutes);
// // app.use("/api/users", userRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/admin", adminRoutes);

// // Port
// const PORT = process.env.PORT || 5000;

// // MongoDB connection + server start
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//   });



