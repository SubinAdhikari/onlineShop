const express = require('express');
const router = express.Router();
const orderModel = require('../models/Orders.model');
const productModel = require('../models/Product.model');
const nodemailer = require('nodemailer');



router.get('/',async(req,res)=>{
    try{
        const allOrders = await orderModel.find();
        res.json(allOrders)
    }catch(err){
        res.json(err)
    }
})





router.post('/:email',async(req,res)=>{

    const cartItems = new orderModel({
        orderData : req.body
    })

    try{
    const savedData = await cartItems.save();
    res.json(savedData);

      // =================== SEND EMAIL ====================
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.GMAIL_EMAIL,
            pass:process.env.GMAIL_PASSWORD
        }
    });
    const mailOption ={
        from:process.env.GMAIL_EMAIL,
        to:req.params.email,
        subject:'Order Confirmation',
        // text:`<h1>Thanks for Using our service</h1><p><a href=${token}>Click Me</a>`
        html:`<h1>Thanks for Ordering from us</h1><p>Your order has been placed successfully. Continue shopping.</p><p>Your Order Id is : ${savedData._id}</p>`
    };
    transporter.sendMail(mailOption,function(error,info){
        if(error){
            console.log(error)
        }else{
            res.json({message:'Mail has been send to your email'});
        }
    });
    // SEND EMAIL ENDS

    }catch(err){
        res.json(err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const deletedData = await orderModel.deleteOne({_id:req.params.id})
        res.json(deletedData)
    }catch(err){
        res.json(err)
    }
})

module.exports = router;