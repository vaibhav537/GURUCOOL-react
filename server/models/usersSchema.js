const mongoose = require('mongoose');
const contact =  require("../config/conndb");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  });


  const User = contact.models.USER || contact.model("USER", userSchema);

  module.exports = User;
  