const express = require('express');
const model = require('../models/User.model');
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');



router.post('/',async(req,res)=>{

    const {fullName,email,mobileNo,password} = req.body;

    if(fullName.length <= 0 || email.length <= 0 || mobileNo.length <= 0 || password.length <= 0){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    //=============== UNIQUE EMAIL CHECK ==================
    const user = await model.findOne({email});
      if (user) return res.json({validationError:{message: 'User Already Exists.Please Login'}})
    //=============== UNIQUE EMAIL CHECK ==================


    // const userInput = new model({
    //     fullName,
    //     email,
    //     mobileNo,
    //     password
    // })
        //     const salt = await bcrypt.genSalt(7);
    //     userInput.password = await bcrypt.hash(userInput.password, salt);
    //    const savedData = await userInput.save();
    //    res.json(savedData) 


    try{

    // ================== Create JWT Token =================
    const token = jwt.sign({fullName,email,mobileNo,password}, process.env.JWT_KEY, {expiresIn:'300000'}); //expire in 5 minutes
    console.log(token)
    // =================== SEND EMAIL ====================

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
        to:email,
        subject:'Activate Your Account',
        // text:`<h1>Thanks for Using our service</h1><p><a href=${token}>Click Me</a>`
        html:`<h1>Thanks for Registration</h1><p>Please click <a href=http://localhost:3000/activate_account/${token}>here</a> to activate your account. This token will be invalid in 5 minutes</p>`
    };
    transporter.sendMail(mailOption,function(error,info){
        if(error){
            console.log(error)
        }else{
            res.json({message:'Mail has been send to your email.Please Activate your account to buy product'});
        }
    });
    // SEND EMAIL ENDS


    }catch(err){
        res.json(err)
    }


})

router.post('/activate', async (req,res)=>{

    const {token} = req.body

    //==================== Check token Expire or not ================
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
        if(err){
            res.json({errorMessage:{errors: 'Token Expired or Invalid'}})
            return;
        }

        // =============== UNIQUE EMAIL CHECK ========================
        let user = await model.findOne({
            email: decoded.email
          });
          if (user) return res.json({errorMessage:{errors: 'User Already Activated'}})


        // =======================  Register User =======================
        const userInput = new model({
            fullName: decoded.fullName,
            email:decoded.email,
            mobileNo:decoded.mobileNo,
            password:decoded.password,
        });

        try{
                const salt = await bcrypt.genSalt(7);
                userInput.password = await bcrypt.hash(userInput.password, salt);
                const savedData = await userInput.save();
                res.json(savedData) 
        }catch(err){
            res.json(err)
        }

      });

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
