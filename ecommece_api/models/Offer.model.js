const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    desc:{
        type: String,
        require: true
    },
    imgName:{
        type: String,
        require: true
    },
    placement:{
        type: String,
        require: true
    },
})

module.exports = mongoose.model("Offer",OfferSchema)