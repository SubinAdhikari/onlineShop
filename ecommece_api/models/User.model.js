const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    mobileNo:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    cart:{
        type: String,
    }
});

module.exports = mongoose.model("User",UserSchema)