const mongoose = require("mongoose");

// mongoose.Schema(fileds, options}
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  userType: { type: String },
  refreshToken: { type: String },
  issuedAt: { required: true, type: String },  
  maximumDateForToken: { required: true, type: String }},
     { timestamps: true},

);

const users = mongoose.model("users", userSchema);
module.exports = { users };
