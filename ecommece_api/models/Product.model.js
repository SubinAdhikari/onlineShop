const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    categoryName:{
        type:String,
        require:true
    },
    subCategoryName:{
        type: String,
    },
    productName:{
        type:String,
        require:true
    },
    productCostPrice:{
        type:String,
        require: true
    },
    productSellingPrice:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    imgName:{
        type:String,
        require:true
    },
    totalInventry:{
        type:String,
        required:true
    }
})



module.exports = mongoose.model("Product",ProductSchema);