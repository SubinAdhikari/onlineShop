const express = require('express');
const router = express.Router();
const model = require('../models/Product.model');


router.get('/',async(req,res)=>{
    try{
        const data = await model.find().sort({'_id':-1});
        res.json(data)
    }catch(err){
        res.json(err)
    }
})

// SPECIFIC BY CAT NAME OR SUB CAT NAME
router.get('/:productCatOrSubCategory',async(req,res)=>{
    try{
        const data = await model.find({$or:[{subCategoryName:req.params.productCatOrSubCategory},{categoryName:req.params.productCatOrSubCategory}]}).select(["-productCostPrice","-totalInventry"]).sort({'_id':-1});
        res.json(data)
    }catch(err){
        res.json(err)
    }
})


router.post('/',async(req,res)=>{

    const {categoryName,subCategoryName,productName,productCostPrice,productSellingPrice,description,imgName,totalInventry} = req.body;

    if(categoryName.length <= 0 || productName.length <= 0 || productCostPrice.length <= 0 || productSellingPrice.length <= 0 || description.length <= 0 || imgName.length <= 0 || totalInventry.length <= 0 ){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    const userInput = new model({
        categoryName,
        subCategoryName,
        productName,
        productCostPrice,
        productSellingPrice,
        description,
        imgName,
        totalInventry
    });

    try{
        const savedData = await userInput.save();
        res.json(savedData);
    }catch(err){
        res.json(err)
    }

})


router.delete('/:id',async(req,res)=>{
try{
    const deletedData = await model.deleteOne({_id:req.params.id})
    res.json(deletedData)
}catch(err){
    res.json(err)
}
})


module.exports = router;