const express = require("express");
const orderRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const protect = require("../middleware/Auth");
const Order = require("../models/Order");

// Create new order
orderRoute.post(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    // Destructure the properties of req.body to create a new order
    const {
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items found");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethods,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

// Order payment route
orderRoute.put(
  "/:id/payment",
  protect,
  AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);
// Get all the orders.
orderRoute.get(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      throw new Error("Orders not found");
    }
  })
);

// Get one order by id.
orderRoute.get(
  "/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

module.exports = orderRoute;
