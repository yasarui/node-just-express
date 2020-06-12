const express = require("express");
const router = express.Router();
const userContext = require("../context/userContext");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/authenticate');

router.get("/api/users",async (req,res)=>{
    try{
      const users = await userContext.getAllUsers();
      res.status(200).json({users});
    }catch(e){
        res.status(400).send(e.messae);
    }
});

router.get("/api/users/me",auth,async (req,res)=>{
    res.status(200).send({user:req.user});
});


router.post("/api/users",async (req,res)=>{
    const { name,email,password} = req.body;
     try{
        const user = await userContext.addUser({name,email,password});
        res.status(201).send({user});
     }catch(e){
         res.status(400).send(e.message);
     }
});

router.delete("/api/users/me",auth,async (req,res)=>{
    try{
        await req.user.remove();
        res.sendStatus(204);
    }catch(e){
       res.status(400).json({error:e.messae});
    } 
});

router.post("/api/users/login",async (req,res)=>{
    const { email,password } = req.body;
    try{
       const user = await User.findUserByCredentials(email,password);
       if(!user) return res.status(401).json({"error":"Invalid Login"});
       const token = jwt.sign({id:user.id},process.env.ACCESS_TOKEN_SECRET);
       user.token = token;
       await user.save();
       res.status(200).json({token});
    }catch(e){
        console.log("error ",e);
        res.status(401).json({"error":"Invalid Login"});
    }
});

router.post("/api/users/logout", auth, async (req,res)=>{
    try{
      req.user.token = undefined;
      await req.user.save();
      res.status(200).send();
    }catch(e){
        res.status(400).send(e.messae);
    }
});




module.exports = router;