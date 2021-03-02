const express = require('express');
const router = express.Router();
const model = require('../models/DeliveredProduct.model');

router.get('/',async(req,res)=>{
    try{
        const data = await model.find();
        res.json(data)
    }catch(err){
        res.json(err)
    }
})



router.post('/',async(req,res)=>{

    const cartItems = new model({
        orderData : req.body
    })

    try{
    const savedData = await cartItems.save();
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