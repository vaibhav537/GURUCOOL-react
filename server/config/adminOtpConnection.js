const mongoose =  require("mongoose");

const adminOtpConnection = mongoose.createConnection(process.env.DBADMIN);


module.exports = adminOtpConnection;