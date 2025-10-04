import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { UserModel } from "../models/UserModel.js";
import mongoose from "mongoose";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body; // ✅ Declare first

    console.log("📦 Incoming order:", order);
    console.log("🔹 Authenticated user:", req.user);

    try {
      if (!req.user || !req.user.id) {
        return res.status(401).send("Unauthorized: missing user");
      }

      if (!order.items || order.items.length <= 0) {
        return res.status(BAD_REQUEST).send("Cart Is Empty!");
      }

      await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW,
      });

      const newOrder = new OrderModel({
        ...order,
        user: req.user.id,
      });

      await newOrder.save();
      res.send(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

router.put(
  "/pay",
  handler(async (req, res) => {
    try {
      const { paymentId } = req.body;
      console.log("paymentId=", paymentId);

      if (!paymentId) {
        return res.status(BAD_REQUEST).send("Payment ID is required!");
      }
      const order = await getNewOrderForCurrentUser(req);
      if (!order) {
        return res.status(BAD_REQUEST).send("Order Not Found!");
      }

      order.paymentId = paymentId;
      order.status = OrderStatus.PAYED;
      await order.save();
      res.send(order);
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

router.get(
  "/track/:orderId",
  handler(async (req, res) => {
    const { orderId } = req.params;
    console.log(req.params.id);
    console.log("Type of orderId:", typeof orderId);
    console.log("OrderId value:", orderId);
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).send({ error: "Invalid orderId" });
    }

    const user = await UserModel.findById(req.user.id);
    const filter = { _id: new mongoose.Types.ObjectId(orderId.toString()) };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);

    if (!order) {
      return res.status(401).send({ error: "Unauthorized or Order not found" });
    }

    return res.send(order);
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    try {
      const order = await getNewOrderForCurrentUser(req);
      if (order) res.send(order);
      else res.status(BAD_REQUEST).send("Order Not Found!");
    } catch (error) {
      console.error("Error fetching new order for current user:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

router.get("/allstatus", (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.send(allStatus);
});

router.get(
  "/:status?",
  handler(async (req, res) => {
    const status = req.params.status;
    const user = await UserModel.findById(req.user.id);
    const filter = {};

    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;

    const orders = await OrderModel.find(filter).sort("-createdAt");
    res.send(orders);
  })
);

const getNewOrderForCurrentUser = async (req) => {
  try {
    return await OrderModel.findOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
  } catch (error) {
    console.error("Error fetching new order for current user:", error);
    throw error;
  }
};

export default router;
