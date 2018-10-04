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
// nhận dữ liệu tên người chơi và lưu vào trong database
app.post('/',(req,res) => {
    const newGame = {
        player1 : {
            name : req.body.name1,       
        },
        player2 : {
            name : req.body.name2,      
        },
        player3 :{
            name : req.body.name3,        
        },
        player4 : {
            name : req.body.name4,
        }
    }
    GameModel.create(newGame,(err,gameCreated) =>{
        if(err) console.log(err)
        else {
            res.redirect(`http://localhost:8080/index2.html?gameId=${gameCreated._id}`);
            console.log("Đã thêm thành công!");     
        }
    })
});

app.get('/games/:id',(req,res) => {
    const id = req.params.id;
    console.log("id : " + id);
    GameModel.findById(id,(err, gameFound) => {
        if(err) console.log(err)
        else
            {
                res.send({message : 'Trả về kêt quả nè', games : gameFound})
            }
    })
})

app.put('/games/addround',(req,res) => {
    const id = req.body.id;
    console.log(id);
    GameModel.findByIdAndUpdate(id,
        {
            $push: {
                'player1.score' : 0,
                'player2.score' : 0,
                'player3.score' : 0,
                'player4.score' : 0,
            }
        },
        {new: true},
        (err, gameFound) => {
        if(err) console.log(err)
        else
            {
                res.send({message : 'Trả về kêt quả: ', games : gameFound})
            }
    })
})
app.put('/games/updateScore',(req,res) =>{
    const {id,player,row,newScore} = req.body;
    GameModel.findById(id,
        (err,gamesFound) => {
            if(err) 
                res.status(500).json({ success: 0, error: err })
            else if(!gamesFound)
                res.status(404).json({ success: 0, error: "No such user!" })
            else
                {
                    const newsocre = parseInt(newScore)
                    if(player == 1)
                    {
                        gamesFound.player1.score[row] =  parseInt(newScore) ;
                        gamesFound.player1.sops = Total(gamesFound.player1.score);
                    }            
                    else if(player == 2) 
                    {
                        gamesFound.player2.score[row] =  parseInt(newScore) ;
                        gamesFound.player2.sops =Total(gamesFound.player2.score);
                    }
                    else if(player == 3)
                    {
                        gamesFound.player3.score.score[row]  =   parseInt(newScore) ;
                        gamesFound.player3.sops =Total(gamesFound.player3.score);
                    }
                    else 
                    {
                        gamesFound.player4.score.score[row]  =   parseInt(newScore) ;
                        gamesFound.player4.sops =Total(gamesFound.player4.score);
                    }
                    gamesFound.save((err,gamesUpdated) => {
                       if(err)  res.status(500).json({ success: 0, error: err })
                       else
                        res.send({message:1, games: gamesUpdated});
                   })
                }
        });
})

function Total(ScoreArray){
    let total = 0;
    for(let i = 0;i<ScoreArray.length;i++){
        total +=parseInt(ScoreArray[i],10);
    }
    return total;
}
app.listen(6969, (err) =>{

    if(err) console.log(err);
    else console.log("Server is running at port 6969");
});

