const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    default:'employee'
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: false });
module.exports = User = mongoose.model("users", userSchema);