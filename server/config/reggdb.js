const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const register = mongoose.createConnection(process.env.DBREGG);
console.log("MongoDB Connected For Register".italic.bold);
module.exports = register;
