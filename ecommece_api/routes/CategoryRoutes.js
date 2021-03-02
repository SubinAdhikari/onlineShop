const express = require('express');
const router = express.Router();
const model = require('../models/Category.model');

router.get('/', async (req,res)=>{
    try{
        const data = await model.find();
        res.json(data);
    }catch(err){
        res.json(err)
    }
})

router.post('/',async(req,res)=>{
    const {categoryName,categorySlug,status} = req.body;


    if(categoryName.length <= 0 || categorySlug.length <= 0 || status.length <= 0){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    //=============== UNIQUE EMAIL CHECK ==================
    const category = await model.findOne({categoryName});
    if (category) return res.json({validationError:{message: 'Category Already Exists'}})
//=============== UNIQUE EMAIL CHECK ==================

    const userInput = new model({
        categoryName,
        categorySlug,
        status,
    })

    try{
        const savedData = await userInput.save();
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


// Get Specific
router.get('/:categoryName', async (req,res)=>{
    try{
        const data = await model.find({categoryName: req.params.categoryName});
        res.json(data);
    }catch(err){
        res.json(err)
    }
})

module.exports = router;