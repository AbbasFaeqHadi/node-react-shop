const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const products = require("./data/Products");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an express app
const PORT = process.env.PORT || 9000;

app.use(express.json()); // Enable express to parse JSON data

// Connect to db
mongoose
  .connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("MongoDB connected"))
  .then((err) => err);

// Database seeder route
app.use("/api/seed", databaseSeeder);

// Route for users
// e.g., api/users/login is used for login,
// and the login route in routes/User.js will be called.
app.use("/api/users", userRoute);

//Route for products
app.use("/api/products", productRoute);

//Route for order
app.use("/api/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/*
afh199809
qFYtgx2KFsevelXU
mongodb+srv://afh199809:qFYtgx2KFsevelXU@cluster0.mwc1dge.mongodb.net/REACT-NODE-APP
Current IP address (212.247.163.6) is added to enable local connectivity.
*/
