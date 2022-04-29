const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wordsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  word_til: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  video: {
    type: String
  },
  is_pass: {
    type: Boolean,
    default: false
  }

});
module.exports = Word = mongoose.model("words", wordsSchema);