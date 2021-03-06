const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    // MongoDB tự sinh ID cho các phần tử mới được tạo

            player1 : [{
                name: String,
                score: [{type: Number}]
            }],
            player2 : [{
                name: String,
                score: [{type: Number}]
            }],
            player3 : [{
                name: String,
                score: [{type: Number}]
            }],
            player4 : [{
                name: String,
                score: [{type: Number}]
            }],
},{
    // Tắt ID mặc định _id : _id : false (không muốn mongodb tự tạo id)
    timestamps:true
});

module.exports =  mongoose.model('game',GameSchema);