const mongoose =  require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const UserOtp = mongoose.createConnection(process.env.DBREGG);

module.exports = UserOtp;