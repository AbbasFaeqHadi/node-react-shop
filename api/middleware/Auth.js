/* 
We are going to use JSON Web Tokens (JWT) for authorization.
Instead of storing the user in the session in the server memory, 
we create a JWT for the user with a secret key.
The secret key is used to sign the JWT and verify the JWT.
*/
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Protect routes using middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.json(401);
    throw new Error("Not authorized!");
  }
});

module.exports = protect;
