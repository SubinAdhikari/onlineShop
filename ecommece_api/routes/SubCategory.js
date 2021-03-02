const express = require('express');
const router = express.Router();
const model = require('../models/Category.model');

// router.get('/', async (req,res)=>{
//     try{
//         const data = await model.find();
//         res.json(data);
//     }catch(err){
//         res.json(err)
//     }
// })

router.post('/',async(req,res)=>{
    const {categoryName,subCategoryName,subCategorySlug} = req.body;


    if(categoryName.length <= 0 || subCategoryName.length <= 0 || subCategorySlug.length <= 0){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    //=============== UNIQUE EMAIL CHECK ==================
    const subCategory = await model.findOne({subCategoryName});
    if (subCategory) return res.json({validationError:{message: 'Sub Category Already Exists'}})
    //=============== UNIQUE EMAIL CHECK ==================

    const userInput ={
        subCategoryName,
        subCategorySlug,
    }

    try{
        const data = await model.findOne({categoryName})
        // data.dropdown = userInput
        data.dropdown.push(userInput)
        const savedData = await data.save();
        res.json(savedData);
    }catch(err){
        res.json(err)
    }

})


router.delete('/:id',async(req,res)=>{
        // const isIdPresent = model.findOne({_id:req.params.id})
        // res.json(isIdPresent)
    
    try{
        const deletedData = await model.deleteOne({_id:req.params.id})
        res.json(deletedData)
    }catch(err){
        res.json(err)
    }
})

module.exports = router;