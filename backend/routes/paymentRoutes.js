// backend/routes/paymentRoutes.js

import express from "express";
import { payNow } from "../controllers/paymentController.js";  // ← use the correct export name

const router = express.Router();

// Endpoint for processing payment
router.post("/pay", payNow);  

export default router;




// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { isUser } from "../middleware/roleMiddleware.js";
// import {
//   stripePayment,
//   easypaisaPayment,
// } from "../controllers/paymentController.js";

// const router = express.Router();

// router.post("/stripe", protect, isUser, stripePayment);
// router.post("/easypaisa", protect, isUser, easypaisaPayment);

// export default router;
