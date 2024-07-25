const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define user schema.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Validate whether the password matched or not.
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Pre-save middleware runs before saving a user.
// First, register password hash, and then, save it in the database.
userSchema.pre("save", async function (next) {
  // A callback func that skips hashing if the password hasn't been changed/hashed.
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10); // generating salt is an asynchronous operation.
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
