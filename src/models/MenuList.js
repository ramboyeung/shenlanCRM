const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuListSchema = new Schema({
  path_name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  parent: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});
module.exports = MenuList = mongoose.model("menuLists", menuListSchema);