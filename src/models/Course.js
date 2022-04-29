const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  course_nm: {
    type: String,
    required: true
  },
  introduce: {
    type: String,
    required: true
  },
  is_free: {
    type: Boolean,
    default: false
  },
  price: {
    type: String,
    required: true
  },
  book_rec: {
    type: String
  }

}, { timestamps: true });
module.exports = Course = mongoose.model("courses", courseSchema);