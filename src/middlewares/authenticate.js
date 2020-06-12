const jwt = require("jsonwebtoken");
const User = require('../models/user');
const authenticate = async function(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,authData)=>{
        if(err) return res.sendStatus(500);
        const user = await User.findOne({_id:authData.id,token});
        if(!user) return res.sendStatus(401);
        req.user = user;
        next(); 
    })
}

module.exports = authenticate;