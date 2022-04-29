const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profileSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  },
  description: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  }

}, { timestamps: false });
module.exports = Profile = mongoose.model("profiles", profileSchema);