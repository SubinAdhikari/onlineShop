const express = require('express');
const router = express.Router();
const model = require('../models/Admin.model');
const bcrypt = require("bcrypt");


router.get('/',async(req,res)=>{
    try{
        const data = await model.find();
        res.json(data)
    }catch(err){
        res.json(err)
    }
})

router.post('/', async (req,res)=>{
        const {fullName,email,password,contactNo,address} = req.body;

        if(fullName.length <= 0 || email.length <= 0 || password.length <= 0 || contactNo.length <= 0 || address.length <= 0){
            res.json({validationError:{message:"All Fields are required"}})
            return;
        }

    //=============== UNIQUE EMAIL CHECK ==================
        const user = await model.findOne({email});
        if (user) return res.json({validationError:{message: 'User Already Exists.Please Login'}})
    //=============== UNIQUE EMAIL CHECK ==================

    const userInput = new model({
        fullName,
        email,
        password,
        contactNo,
        address,
    })

    try{
    const salt = await bcrypt.genSalt(7);
    userInput.password = await bcrypt.hash(userInput.password, salt);

    const savedData = await userInput.save();
    res.json(savedData) 

    }catch(err){
        res.json(err)
    }
})

router.post('/auth',async(req,res)=>{
    const {email,password} = req.body;

    if(email.length <= 0 || password.length <= 0){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    try{
        
        const checkEmail = await model.findOne({email})
        if(!checkEmail){
            res.json({validationError:{message:"Email Not Registred"}})
            return; 
        }

        bcrypt.compare(password, checkEmail.password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
                res.json({validationError:{message:"Invalid Credientials"}})
            } else {
                res.json(checkEmail)
            }
          })

        }catch(err){
            res.json(err)
        }

})

module.exports = router;