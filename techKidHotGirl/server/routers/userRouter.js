const express = require('express');

const usersRouter = express.Router();

const UserModel = require('../model/user.model')

usersRouter.post('/', (req,res) => {
    const { username, password, name, avatar, gender} = req.body || {};
    // MÃ hóa mật khẩu
    UserModel.create({ username, password, name, avatar, gender}).then(userCreated => {
        res.status(201).json({success:1,user:userCreated});
    }).catch(err => res.status(500).json({success: 0,error:err}));

    // UserModel.create(
    //     { username, password, name, avatar, gender},
    //     (err,userCreated => {
    //         if(err)  res.status(201).json({success:1,user:userCreated});
    //         else
    //         res.status(500).json({success: 0,error:err});
    // }));
})

usersRouter.get('/',(req,res) => {
    UserModel.find({},{password: 0},(err,users) => {
        if(err) res.status(500).json({success:0, error:err})
        else res.json({success: 1,users : users});
    })
})

usersRouter.put('/:id',(req,res) => {
    const { username, password, name, avatar, gender} = req.body || {};
    const userChange = { username, password, name, avatar, gender};
    const userId = req.params.id;

    UserModel.findById(
        userId,
        (err, userFound) => {
            if(err) res.status(500).json({success:0, error:err})
            else if(!userFound) res.json({success: 0,error : "No User match!!!"});
            else
                // userFound = {...userFound, name, password, avatar, gender};
                // if(name) userFound.name = name;
                // if(password) userFound.password = password;
                // if(userFound) userFound.avatar = avatar ;
                // if(gender) userFound.gender = gender ;
                // ... nối userFound vào trong object userfound
                for(key in userChange){
                    if(userChange[key])
                        userFound[key] == userChange[key]; 
                }
                userFound.save((err,userUpdated) => {
                    if(err) res.status(500).json({success:0, error:err})
                    else res.json({success: 1,user : userUpdated});
                })
        });
})

module.exports = usersRouter;