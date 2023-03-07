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
    role:{
        type:String,
        requried:true,
        enum:['Doctor','Patient','Admin'],
        default:'Patient'
    },
    token:{
        type:String,
        default:''
    }
})

//fire a function after doc saved to db
userSchema.post('save',function(doc,next){               //after event save do or remove for exemple ..
    console.log("new user was created and saved",doc);     //doc howa objet mteek yali howa user
    next();           //always at the end of hook or middlewares

})

//fire a function before doc saved to db
userSchema.pre('save',async function(next){                       //function that hash password in mongoDB    
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)
    next();           

})

userSchema.statics.login=async function(email,password){            //compare email and password to login
    const user=await this.findOne({email})
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