const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const category = mongoose.createConnection(process.env.DBADDCATE)

module.exports = category;