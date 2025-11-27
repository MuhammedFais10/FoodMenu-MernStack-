import express from "express";
import handler from "express-async-handler";
import Razorpay from "razorpay";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post(
  "/razorpay/create-order",
  handler(async (req, res) => {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      res.status(400);
      throw new Error("Amount and Order ID are required");
    }

    const options = {
      amount: Math.round(amount * 100), // INR → paisa
      currency: "INR",
      receipt: orderId,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json(razorpayOrder);
  })
);

export default router;
