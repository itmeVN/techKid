const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const apiRouter = require('./routers/apiRouter')
const session = require('express-session')
mongoose.connect('mongodb://localhost/hotgirl',function(err){
    if(err) console.log(err);
    else
        console.log("Connect Database Success!!!");
})
 let app = express();
 app.use(bodyparser.urlencoded({extended: false}));
 app.use(bodyparser.json());
 app.use(session ({
     secret: 'keyword cat',
     resave: false,
     saveUninitialized: true,
     cookie: {
         httpOnly: false,
         maxAge: 7*24*60*60*1000
     }
 }))
 app.get('/',function(){
     console.log('Hello world');
 })

 app.use('/api',apiRouter)
 app.listen('6969',(err) => {
    if(err)
        console.log(err);
    else
        console.log("Server is listening at port 6969");
 })