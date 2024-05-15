const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  Address: {
    type: String,
  },

  role: {
    type: String,
    default: "membar",
    enum: ["admin", "marchent", "membar"],
  },

  emailVerify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
  OTP: {
    type: String,
  },
});

module.exports = mongoose.model("User", user);
