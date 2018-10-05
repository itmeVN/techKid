const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    // MongoDB tự sinh ID cho các phần tử mới được tạo
            player1 : {
                name: String,
                score: [{type:Number}],
                sops : {type:Number,default: 0}
            },
            player2 : {
                name: String,
                score: [{type:Number}],
                sops : {type:Number,default: 0}
            },
            player3 : {
                name: String,
                score: [{type:Number}],
                sops : {type:Number,default: 0}
            },
            player4 : {
                name: String,
                score: [{type:Number}],
                sops : {type:Number,default: 0}
            },
},{
    // Tắt ID mặc định _id : _id : false (không muốn mongodb tự tạo id)
    timestamps:true
});

    GameSchema.pre('save',function(next){
        console.log(this);
        next();
    })

module.exports =  mongoose.model('game',GameSchema);