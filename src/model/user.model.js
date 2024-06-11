const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName:{
        type:String
    },
    mobileNo:{
        type:Number
    },
    email:{
        type:String,
        Unique:true
    },
    Street:{
        type:String
    },
    City:{
        type:String
    },
    District:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        enum:['Male' , 'Female']
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('users' , userSchema);