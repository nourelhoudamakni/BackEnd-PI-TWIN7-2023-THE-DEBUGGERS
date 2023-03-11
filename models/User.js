const mongoose=require('mongoose');
const {isEmail}=require('validator')  //isEmail mawjouda deja f west validator
const bcrypt=require("bcrypt")




const userSchema=new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    dateOfBirth:Date,
    gender:String,
    address:String,
    phoneNumber:String,
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter an password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
    confirmPassword:String,
    code:String,
    phoneNotVerif:String,
    secret:{
        type:String,
        default:'' 
     },
    role:{
        type:String,
        requried:true,
        enum:['doctor','patient'],
        default:'patient'
    },
    confirmed:{
        type:Boolean,
        defaultValue:false,
    },
    token:{
        type:String,
        default:''
    },
    secret:{
        type:String,
        default:'' 
     }

},{
    discriminatorKey: 'userType' // set discriminator key to 'userType'
})

userSchema.statics.login=async function(email,password){            //compare email and password to login
    const user=await this.findOne({email})
    if (!user.confirmed){
        throw Error('email not confirmed!')
    }
    if(user){
        const auth= await bcrypt.compare(password,user.password)         //to compare user password with the stocked password in the database if true:pass if false:dosent pass
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema);
module.exports=User;