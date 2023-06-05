//Importing the mongood=se package to defint the schema
const mongoose =  require("mongoose");

//importing the connection 
const UserOtp  = require("../config/userOTpConnection"); 

//Defining the schema 
const UserOtpSchema = mongoose.Schema({
    email: String,
    code : String,
    expireIn : Number
}, {
    timestamps: true
})

// Creating the documents in the database
let userOtp =  UserOtp.models.USEROTP|| UserOtp.model("USEROTP", UserOtpSchema);

module.exports = userOtp;