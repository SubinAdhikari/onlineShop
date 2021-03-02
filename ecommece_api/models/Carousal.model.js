const mongoose = require('mongoose');

const CarousalSchema = mongoose.Schema({
    imgDesc:{
        type:String,
        require:true
    },
    imgName:{
        type:String,
        require:true
    },
})



module.exports = mongoose.model("Carousal",CarousalSchema);