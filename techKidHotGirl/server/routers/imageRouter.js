const express = require('express');
const imagesRouter = express.Router();

const imageModel = require('../model/image.model');
imagesRouter.post('/', (req,res) => {
    const { imgUrl,owner,caption,title} = req.body || {};

    imageModel.create({ imgUrl,owner,caption,title}).then(imgCreated => {
        res.status(201).json({success:1,image:imgCreated});
    }).catch(err => res.status(500).json({success: 0,error:err}));

    // UserModel.create(
    //     { username, password, name, avatar, gender},
    //     (err,userCreated => {
    //         if(err)  res.status(201).json({success:1,user:userCreated});
    //         else
    //         res.status(500).json({success: 0,error:err});
    // }));
})

imagesRouter.get('/',(req,res) => {
    imageModel.find({},(err,images) => {
        if(err) res.status(500).json({success:0, error:err})
        else res.json({success: 1,images : images});
        })
        .populate('owner')
        .exec(function(err,images){
        if(err)
          console.log(err); 
         })
})

imagesRouter.put('/')


module.exports = imagesRouter;