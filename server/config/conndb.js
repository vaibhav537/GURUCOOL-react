const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const contact = mongoose.createConnection(process.env.DBCONN);
console.log("MongoDB Connected For Contact".cyan.bold);
module.exports = contact;
