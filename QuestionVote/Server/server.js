const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
let app = express();

app.get('/',(req,res) => {
    res.send("Hello world");
});
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));

app.post('/ask',(req,res) =>{
    console.log(req.body.question);
    fs.readFile('./questions.txt', (err,fileData) =>{
        if(err) console.log(err)
        else
            try{
               
                let questions = [];
                if(fileData > 0 && JSON.parse(fileData).length) {
                    questions = JSON.parse(fileData);
                    const newQuestion  = {
                        id: questions.length + 1,
                        question: req.body.question,
                        yes:0,
                        no:0
                    }
               }
               
                questions.push(newQuestion);
                fs.writeFile('./questions.txt',JSON.stringify(questions), (err) =>{
                    if(err) console.log(err)
                    else res.redirect('http://localhost:8080');
                });
            }
            catch (error){
                console.log(error);
            }
      
    });
});

app.get('/question',(req,res) =>{
    fs.readFile('./questions.txt', (err,fileData) =>{
        if(err) console.log(err)
        else{
            try{
                let questions = JSON.parse(fileData);
                let RadomNum = Math.floor(Math.random()* questions.length); 
                let RandomQuestion = questions[RadomNum];
                res.send(RandomQuestion)
            }
            catch(err){
                console.log("Error: " + err);
            }
        }
    })
});

app.put('/answer',(req,res) =>{
    fs.readFile('./questions.txt', (err,fileData) =>{
        if(err) console.log(err)
        else{
            try{
                let questions = [];
                if(questions.length >0 && JSON.parse(fileData).length){
                    questions = JSON.parse(fileData);
                }
                for(let i=0;i< questions.length;i++){
                    if(questions[i].id = req.body.id){
                        if((req.body.yes) == "yes")
                            questions[i].yes +=1;
                        else
                            questions[i].no +=1;
                    }
                }
            }
            catch(err){
                console.log("Error: " + err);
            }
        }
    })
});
app.listen(6969, (err) =>{
    if(err) console.log(err);
    else console.log("Server is running at port 6969");
});