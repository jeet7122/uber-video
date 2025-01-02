const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
    This middleware function checks if the user is authenticated.
    It checks if the token is present in the request header or in the cookies.
    If the token is not present, it returns a 401 status code.
    If the token is present, it verifies the token and gets the user from the database.
    It then attaches the user to the request object and calls the next middleware function.
*/
module.exports.authUser = async(req,res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await userModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
         
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({message: 'Unauthorized'});
    }
}