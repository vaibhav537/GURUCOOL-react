//Importing the mongood=se package to defint the schema
const mongoose = require("mongoose");

//importing the connection 
const adminOtpConnection = require("../config/adminOtpConnection");

//Defining the schema 
const otpSchema = mongoose.Schema({
    email: String,
    code : String,
    expireIn : Date
}, {
    timestamps: true
})

// Creating the tabel in the database
let OtpSchema =  adminOtpConnection.models.OTP || adminOtpConnection.model("OTP", otpSchema);

module.exports = OtpSchema;