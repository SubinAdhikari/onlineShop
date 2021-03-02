const express = require('express');
const router = express.Router();
const model = require('../models/Offer.model');


router.get('/',async(req,res)=>{
    try{
        const data = await model.find().sort({'_id':-1});
        res.json(data)
    }catch(err){
        res.json(err)
    }
})

router.post('/',async(req,res)=>{

    const {desc,imgName, placement} = req.body;

    if(desc.length <= 0 || imgName.length <= 0 || placement.length <=0 ){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    const userInput = new model({
        desc,
        imgName,
        placement,
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