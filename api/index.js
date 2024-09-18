const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Handle fetch from different browsers.
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an express app
const PORT = process.env.PORT || 9000;

app.use(express.json()); // Enable express to parse JSON data
app.use(cors());

// Connect to db
mongoose
  .connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));

// Database seeder route
app.use("/api/seed", databaseSeeder);

// Route for users
// For example, api/users/login is used for login,
// and the login route in routes/User.js will be called.
app.use("/api/users", userRoute);

//Route for products
app.use("/api/products", productRoute);

//Route for order
app.use("/api/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
