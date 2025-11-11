const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userimg:{
        type:String,
        default:""  
    }
})

module.exports = mongoose.model('Admin' ,adminSchema) 