const mongoose = require('mongoose');

const DeliveredProductSchema = mongoose.Schema({
    orderData:{
        type: Array,
        require: true
    }
})



module.exports = mongoose.model("DeliveredProduct",DeliveredProductSchema);