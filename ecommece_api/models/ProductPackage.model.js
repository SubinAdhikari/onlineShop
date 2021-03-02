const mongoose = require('mongoose');

const ProductPackageSchema = mongoose.Schema({
    orderData:{
        type: Array,
        require: true
    }
})



module.exports = mongoose.model("ProductPackage",ProductPackageSchema);