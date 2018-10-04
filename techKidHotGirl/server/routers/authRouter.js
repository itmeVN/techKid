const express = require('express');
const AuthRouter = express.Router();
const UserModel = require('../model/user.model');
const bcrypt = require('bcrypt-nodejs');
AuthRouter.post('/login',(req,res) => {
    const {username, password} = req.body;

    UserModel.findOne({username},(err,userFound) => {
        if(err) res.status(500).json({success: 0,error: err});
        else if(!userFound) res.status(404).json({success: 0,error: "No such User!!"})
        else
            if(bcrypt.compareSync(password,userFound.password)){
                req.session.user = {userId : userFound._id};
                res.json({success: 1,message : "Login SuccessFully!!!"});
            } else res.status(401).json({success: 0, error: "Wrong Login!!!"});
        })
    })
AuthRouter.delete('/logout',(req,res) => {
    req.session.destroy();
    res.send({success: 1, message: "Logout SuccessFully!!!"});
})
module.exports = AuthRouter;