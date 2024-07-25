const router = require("express").Router();
const User = require("./models/User");
const users = require("./data/Users");
const Product = require("./models/Product");
const products = require("./data/Products");
const AsyncHandler = require("express-async-handler");

router.post(
  "/users",
  AsyncHandler(async (req, res) => {
    // Clear the existing users
    await User.deleteMany({});

    // Insert new users with user seed data
    const UserSeeder = await User.insertMany(users);

    // Send the seeded users as a response
    res.send({ UserSeeder });
  })
);

router.post(
  "/products",
  AsyncHandler(async (req, res) => {
    // Clear the existing products
    await Product.deleteMany({});

    // Insert new products with product seed data
    const ProductSeeder = await Product.insertMany(products);

    // Send the seeded products as a response
    res.send({ ProductSeeder });
  })
);

module.exports = router;
