const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const GuruCool = mongoose.createConnection(process.env.DBADMIN);
console.log("MongoDB Connected For GUruCool".italic.bold);


module.exports = GuruCool;
