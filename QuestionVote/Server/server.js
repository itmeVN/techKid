const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
let app = express();
// Khai báo model bên Server
const QuestionModel = require('./models/questionModels');
// Kết nối tới cơ sở dữ liệu
mongoose.connect('mongodb://localhost/quyetde', (err) =>{
    if(err) console.log(err);
    else
        console.log("Connect Success!!!");
});
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
// Nhận câu hỏi từ Client 
app.post('/ask',(req,res) => {
    const newQuestion = {
        content: req.body.question
    }
    QuestionModel.create(newQuestion, (err, questionCreated) => {
        if(err) console.log(err)
        else {
            res.redirect('http://localhost:8080/index.html');
            console.log("Đã thêm thành công!");     
        }
    })
})
// Server trả về một câu hỏi ngẫu nhiên cho Client
app.get('/question', (req,res) => {
    QuestionModel.find({  }, (err, questionFound) => {
        let randomNum = Math.floor(Math.random()*questionFound.length);
        QuestionModel
            .findOne({})
            .skip(randomNum == 0 ? randomNum : randomNum -1)
            .exec((err,questionFound) => {
                if(err) console.log(err)
                else
                 res.send({message : 'Success', question: questionFound})
                }); 
    });
});
// Server nhận câu trả lời từ Client và update vào MongoDB
app.put('/answer',(req,res) => {
    const answer = req.body.answer;
    const questionId = req.body.questionId;
    console.log(answer,questionId);
    if(answer == "yes")
    {
        QuestionModel.findByIdAndUpdate(
            {_id : questionId}, 
            // $inc Để auto tăng giá trị của một ducument
            {$inc : { yes : 1 }},
            {new : true},
            function(err,questionUpdate){
                if(err) console.log(err)
                else
                {
                    res.send({message : 'Update Success!!' ,question : questionUpdate});
                    console.log("Đã cập nhật thành công!");
                }
            }
        )   
    } else
    {
        QuestionModel.findByIdAndUpdate(
            {_id : questionId}, 
            {$inc : { no : 1 }},
            {new : true},
            function(err,questionUpdate){
                if(err) console.log(err)
                else
                {
                    res.send({message: 'Update Success!',question : questionUpdate});
                    console.log("Đã cập nhật thành công!");
                }
            }
        )   
    }
   
});

app.get('/questionInfor',(req,res) => {
    const questionId = req.body.id;
    console.log(questionId);
    QuestionModel.findById(questionId,(err, questionFound) => {
        if(err) console.log(err)
        else
            {
                res.send({message : 'Trả về kêt quả nè', question : questionFound})
            }
    })
});

// app.get('/questionInfor',(req,res) =>{
//     const questionID = req.body;
//     QuestionModel.fin
// })
// app.get('/',(req,res) => {
//     res.send("Hello world");
// });


// app.post('/ask',(req,res) =>{
//     console.log(req.body.question);
//     fs.readFile('./questions.txt', (err,fileData) =>{
//         if(err) console.log(err)
//         else
//             try{
               
//                 let questions = [];
//                 if(fileData > 0 && JSON.parse(fileData).length) {
//                     questions = JSON.parse(fileData);
//                     const newQuestion  = {
//                         id: questions.length + 1,
//                         question: req.body.question,
//                         yes:0,
//                         no:0
//                     }
//                }
               
//                 questions.push(newQuestion);
//                 fs.writeFile('./questions.txt',JSON.stringify(questions), (err) =>{
//                     if(err) console.log(err)
//                     else res.redirect('http://localhost:8080');
//                 });
//             }
//             catch (error){
//                 console.log(error);
//             }
      
//     });
// });

// app.get('/question',(req,res) =>{
//     fs.readFile('./questions.txt', (err,fileData) =>{
//         if(err) console.log(err)
//         else{
//             try{
//                 let questions = JSON.parse(fileData);
//                 let RadomNum = Math.floor(Math.random()* questions.length); 
//                 let RandomQuestion = questions[RadomNum];
//                 res.send(RandomQuestion)
//             }
//             catch(err){
//                 console.log("Error: " + err);
//             }
//         }
//     })
// });

// app.put('/answer',(req,res) =>{
//     const {answer,questionID} =req.body;
//     fs.readFile('./questions.txt', (err,fileData) =>{
//         if(err) console.log(err)
//         else{
//             try{
//                 let questions = [];
//                 if(questions.length >0 && JSON.parse(fileData).length){
//                     questions = JSON.parse(fileData);
//                 }
//                 // for(let i=0;i< questions.length;i++){
//                 //     // if(questions[i].id = questionID){
//                 //     //     if((answer) == "yes")
//                 //     //         questions[i].yes +=1;
//                 //     //     else
//                 //     //         questions[i].no +=1;
//                 //     // }
                   
//                 // }
//                 if(questions[questionID-1]){
//                     questions[questionID-1][answer] +=1;
//                 }
//                 fs.writeFile('./questions.txt',JSON.stringtyfy(questions),(err)=>{
//                     if(err) console.log(err);
//                     else
//                         res.send({message: 'Success',question : questions[questionID -1]});
//                 })
//             }
//             catch(err){
//                 console.log("Error: " + err);
//             }
//         }
//     })
// });

// app.get('/question/:questionID',(req,res)=>{
//     console.log(req.params.questionID);
// })
app.listen(6969, (err) =>{
    if(err) console.log(err);
    else console.log("Server is running at port 6969");
});