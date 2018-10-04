const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // Thư viện mã hóa chuỗi
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    name: {type: String, dafault: ''},
    avatar: {type: String,default: ''},
    gender: {type: String,default: ''}
})

UserModel.pre('save', function(next){
    console.log(this);
    if(this.isModified('password'))
        {
            const salt = bcrypt.genSaltSync(10);
            const hashPasword = bcrypt.hashSync(this.password,salt);
            this.password = hashPasword;
        }
    next();
})

module.exports = mongoose.model('User',UserModel)

