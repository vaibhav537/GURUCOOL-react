const mongoose = require('mongoose');
const register =  require("../config/reggdb");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "NOCATEGORY",
    },
    user: {
      type: String,
      default: "teacher",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender:{
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);


const TeacherSchema =
  register.models.TEACHER || register.model("TEACHER", teacherSchema);

module.exports = TeacherSchema;
