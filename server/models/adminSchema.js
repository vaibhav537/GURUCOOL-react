const mongoose = require('mongoose');
const GuruCool = require('../config/adminConnection');

const adminSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});


const AdminSchema = GuruCool.models.LOGIN || GuruCool.model("LOGIN", adminSchema);

module.exports = AdminSchema;