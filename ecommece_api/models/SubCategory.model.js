const mongoose = require('mongoose');

const SubCategorySchema = mongoose.Schema({
    categoryName:{
        type: String,
        require: true
    },
    subCategoryName:{
        type: String,
        require: true
    },
    subCategorySlug:{
        type: String,
        require: true
    },
})

module.exports = mongoose.model("SubCategory",SubCategorySchema);