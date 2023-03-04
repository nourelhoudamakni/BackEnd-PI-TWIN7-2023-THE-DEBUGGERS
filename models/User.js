const mongoose=require('mongoose');




const userSchema=new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    dateOfBirth:Date,
    gender:String,
    address:String,
    phoneNumber:String,
    email:String,
    password:String,
    confirmPassword:String,
    role:{
        type:String,
        enum:['Doctor','Patient'],
        default:'Patient'
    }
})

const User = mongoose.model('User', userSchema);
module.exports=User;