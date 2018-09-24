const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let app = express();
const GameModel = require('./model/model');
mongoose.connect('mongodb://localhost/game', (err) =>{
    if(err) console.log(err);
    else
        console.log("Connect dataBase Success!!!");
});

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));

app.post('/game',(req,res) => {
    const newGame = {
        player1 : {
            name : req.body.name1
        },
        player2 : {
            name : req.body.name2
        },
        player3 :{
            name : req.body.name3
        },
        player4 : {
            name : req.body.name4
        }
    }
    GameModel.create(newGame,(err,gameCreated) =>{
        if(err) console.log(err)
        else {
            res.redirect(`http://localhost:8080/index2.html/${gameCreated._id}`);
            console.log("Đã thêm thành công!");     
        }
    })
});

app.get(`/game/:id`,(req,res) => {
    const gameid = req.params.id;
    console.log("id : " + gameid);
    GameModel.findById(gameid,(err, gameFound) => {
        if(err) console.log(err)
        else
            {
                res.send({message : 'Trả về kêt quả nè', game : gameFound})
            }
    })
})
app.listen(6969, (err) =>{
    if(err) console.log(err);
    else console.log("Server is running at port 6969");
});
