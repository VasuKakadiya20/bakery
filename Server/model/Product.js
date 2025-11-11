const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true   
    },
    Description:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true   
    },
    category:{
        type: String,
        ref:"category"
    }
    // profileImage: {  
    //     type: String,
    //     default: ""
    // }
})

module.exports = mongoose.model('Product',productSchema)