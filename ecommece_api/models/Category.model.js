const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryName:{
        type: String,
        require: true
    },
    categorySlug:{
        type: String,
        require: true
    },
    dropdown:[
        {
            subCategoryName: String,
            subCategorySlug: String,
        }
    ],
    status:{
        type:String,
        require: true
    },
})

module.exports = mongoose.model("Category",CategorySchema);