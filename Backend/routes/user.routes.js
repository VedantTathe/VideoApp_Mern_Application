const express = require('express');
const {body, validationResult} = require('express-validator');
const userModel = require('../models/user.models');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get("/",(req,res)=>{
    res.send("hi users");
})


router.post("/login",async (req,res)=>{
    console.log(req.body);

    const user = await userModel.findOne({
        email: req.body.email
    });

    if(!user)
    {
        return res.status(400).json({
            message: "username or password not found"
        })
    }
    
    console.log("Entered password:", req.body.password);
    console.log("Stored hash:", user.password);


    const match = await bcrypt.compare(req.body.password,user.password);

    if(!match)
    {
        return res.status(400).json({
            message: "username or password not found"
        })
    }

    const token = jwt.sign({
        userId: user._id,
        username: user.username,
        email: user.email,
    }, process.env.JWT_SECRET_KEY);

    res.cookie('token',token);
    console.log(token);
    return res.status(200).json({
        user:user,
        token:token
    });
})      


router.post("/register", body('email').trim().isEmail(),
body("password").trim().isLength({min:3}),
body("username").trim().isLength({min:4}),
async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.send({
            "errors":errors.array(),
            "message":"Invalid Data"
        })
    }

    console.log(req.body);
    const hashedpswd = await bcrypt.hash(req.body.password,10);
    console.log("you entered: ",req.body.password);
    console.log("hashed: ",hashedpswd);
    const user = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedpswd
    });
    return res.json(user);
})

module.exports = router;

