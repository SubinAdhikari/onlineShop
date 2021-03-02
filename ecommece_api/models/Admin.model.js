const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    contactNo:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Admin",AdminSchema)