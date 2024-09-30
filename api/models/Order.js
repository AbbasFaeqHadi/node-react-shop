const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // The order model has a relationship to the product model
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const orderSchema = new mongoose.Schema(
  {
    // The order model has a relationship to the user model
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

    orderItems: [orderItemSchema],
    shippingDetails: {
      recipientName: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true, default: "Paypal" },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    tax: { type: Number, required: true, default: 0.0 },
    shippingCost: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
