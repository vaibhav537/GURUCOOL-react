const mongoose = require('mongoose');
const register =  require("../config/reggdb");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
  },
  {
    timestamps: true,
  }
);

const StudentRegister =
  register.models.STUDENT || register.model("STUDENT", studentSchema);

module.exports = StudentRegister;
