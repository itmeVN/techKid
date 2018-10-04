const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {type: String,require: true},
    owner: { 
        type: {type: Schema.Types.ObjectId,ref: 'User'}},
},{
    timestamps: true
})

const ImagaModel = new Schema({
    imgUrl : {type: String, unique: true, required: true},
    view : {type: Number, default: 0},
    like : {type: Number,default: 0},
    owner: { 
        type: {type: Schema.Types.ObjectId,ref: 'User'},
        },
    caption : {type: String, default : ''},
    title : {type: String, default: ''},
    comment : [{commentSchema}]
},{
    timestamps: true
})

module.exports = mongoose.model('Image',ImagaModel)