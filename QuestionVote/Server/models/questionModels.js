const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    // MongoDB tự sinh ID cho các phần tử mới được tạo
    // content: String,
    // yes: Number,
    // no: Number,
        content : {type: String, required : true},
        yes : {type: Number, default:0},
        no : {type: Number, default:0}, 
},{
    // Tắt ID mặc định _id : _id : false (không muốn mongodb tự tạo id)
    timestamps:true
});

module.exports =  mongoose.model('question',QuestionSchema);