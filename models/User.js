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
    code:String,
    phoneNotVerif:String,
    secret:{
        type:String,
        default:'' 
     },
    role:{
        type:String,
        enum:['doctor','patient']
    },
    confirmed:{
        type:Boolean,
        defaultValue:false,
    },
},{
    discriminatorKey: 'userType' // set discriminator key to 'userType'
})

const User = mongoose.model('User', userSchema);
module.exports=User;