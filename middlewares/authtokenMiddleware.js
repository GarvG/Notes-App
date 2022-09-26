const jwt =require("jsonwebtoken");
const { model } = require("mongoose");
const User=require("../model/userModel");
const respone=require("../responeMessage.json");

const authToken=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try{
            token=req.headers.authorization.split(" ")[1];

            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user= await User.findById(decoded.id).select("-password");
            next();
        }
        catch(err)
        {
            res.status(401)
            .json(respone.Auth.InvalidAuth);
        }
    }
    if(!token)
    {
        res.status(401).json(respone.Auth.NoToken);
    }
}

module.exports=authToken;