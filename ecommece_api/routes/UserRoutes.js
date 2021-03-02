const express = require('express');
const model = require('../models/User.model');
const router = express.Router();
const bcrypt = require("bcrypt");



router.get('/',async(req,res)=>{
    try{
        // db.Sports.find().sort({'_id':-1}).limit(1) ==> return last data only
       const data = await model.find().sort({'_id':-1});
       res.json(data) 
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

router.post('/auth',async(req,res)=>{
    const {email,password} = req.body;

    if(email.length <=0 || password.length <=0){
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

        // const data = await model.findOne({$and:[{email},{password}]});
        // if(data){
        //     res.json(data)
        // }else{
        //     res.json({validationError:{message:"Invalid Credientials"}})
        //     return;
        //     }
    }catch(err){
        res.json(err)
    }
})

router.patch('/:id',async(req,res)=>{
    const {fullName,email,mobileNo,password} = req.body;


    if(fullName.length<=0 || email.length <=0 || mobileNo.length <=0 || password.length <=0){
        res.json({validationError:{message:"All Fields are required"}})
        return;
    }

    // EMAIL UPDATE CHECK
    let user = await model.findOne({_id: req.params.id});
      if (user.email != req.body.email) return res.json({validationError:{message: 'Email Cannot be changed'}})

      const data = {
        fullName,
        mobileNo,
        password,
        email,
    };

    try{
        if(data.password === user.password){
            const updatedData = await model.updateOne(
                {_id: req.params.id},
                {$set:data},
                )
                res.json(updatedData)
        }else{
        const salt = await bcrypt.genSalt(7);
        data.password = await bcrypt.hash(data.password, salt);
        const updatedData = await model.updateOne(
            {_id: req.params.id},
            {$set:data},
            )
            res.json(updatedData)
        }
    }catch(err){
        res.json(err)
    }

})

module.exports = router;
