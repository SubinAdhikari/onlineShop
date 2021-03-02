const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    orderData:{
        type: Array,
        require: true
    }
    // ,
    // description:{
    //     type: String,
    //     require: true
    // },
    // imgName:{
    //     type: String,
    //     require: true
    // },
    // productName:{
    //     type: String,
    //     require: true
    // },
    // productSellingPrice:{
    //     type: String,
    //     require: true
    // },
    // quantity:{
    //     type: String,
    //     require: true
    // },
    // subCategoryName:{
    //     type: String,
    //     require: true
    // }
})

module.exports = mongoose.model("Orders",OrdersSchema)