const { response } = require("express");
const User=require("../models/User");
const Hospital=require("../models/Hospital");
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer');
const randomstring=require("randomstring");
const bcryptjs = require('bcryptjs');
const speakeasy=require('speakeasy');
require ('dotenv').config();

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', confirmed: '' };
  
    // incorrect email
    if (err.message === "incorrect email") {
      errors.email = "that email is not registred";
    }
    
    // incorrect password
    else if (err.message === "incorrect password") {
      errors.password = "that password is incorrect";
    }
    
    // email not verified
    else if (err.message === "email not confirmed!") {
      errors.confirmed = "email not confirmed!";
    }
    
    // duplicate email error code
    else if (err.code === 11000) {
      errors.email = "that email is already registred";
      return errors;
    }
    
    // validation errors
    else if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    // filter out empty strings
    return Object.fromEntries(
      Object.entries(errors).filter(([key, value]) => value !== '')
    );
  };

  const handleErrorsAdmin = (err) => {
    console.log(err.message, err.code);
    let errors = { AdminEmail: '', PasswordAdmin: '' };
  
    // incorrect email
    if (err.message === "incorrect email") {
      errors.AdminEmail = "that email is not registred";
    }
    
    // incorrect password
    else if (err.message === "incorrect password") {
      errors.PasswordAdmin = "that password is incorrect";
    }
    
    // duplicate email error code
    else if (err.code === 11000) {
      errors.AdminEmail = "that email is already registred";
      return errors;
    }
    
    // validation errors
    else if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    // filter out empty strings
    return Object.fromEntries(
      Object.entries(errors).filter(([key, value]) => value !== '')
    );
  };


// create json web token
const maxAge= 3 * 24 * 60 * 60  //3days with seconds

//function createToken the encoded data here is the id
const createToken = (id,role)=>{
    return jwt.sign({id,role},'User information secret',{    //secret key that is used to sign the jwt (should not share)
        expiresIn:maxAge
    })
}

const createTokenAdmin = (id)=>{
    return jwt.sign({id},'Admin information secret',{    //secret key that is used to sign the jwt (should not share)
        expiresIn:maxAge
    })
}

const login_get=(req,res)=>{
    res.send('Login Page');
}

const login_post=async(req,res)=>{
    const {email,password, secret}=req.body;
   
    try{
        const user=await User.login(email,password); 
        const token=createToken(user._id,user.role,user.secret) 
             //login trajaa user
        if (user.secret) {
            if (!secret) {
                await sendSecretByEmail(email, user.secret);
              
                return res.status(200).json({ message: 'A new 2FA secret has been sent to your email',token});
            } else if (secret!= user.secret) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Two Factor Auth Code!",
                });
            }
        }
        
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).json({user:user._id,role:user.role,token});
        

    }
    catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors});
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    },
  });

const sendSecretByEmail = async (email, secret) => {
    try {
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Your 2FA Secret',
        text: `Your 2FA secret is ${secret}`,
      });
      console.log(`2FA secret sent to ${email}`);
    } catch (error) {
      console.error(`Error sending 2FA secret to ${email}:`, error);
    }
  };

  const logout_get = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ user: "Desconnected" });
  }

const sendRestPasswordMail=async(email,token)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.USER_EMAIL,
                pass:process.env.USER_PASS
            }
        });
        const mailOptions={
            from:process.env.USER_EMAIL,
            to:email,
            subject:'For reset password',
            html:'<p>Hi please copy the link and <a href="http://localhost:3000/reset-password/'+token+'"> reset your password</a>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Mail has been sent:- ",info.response);
            }
        })

    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }
}

const forget_password=async(req,res)=>{
    try{
        const email=req.body.email;
        const userData=await User.findOne({email:email});
        if(userData){
            const randomString=randomstring.generate();
            const data=await User.updateOne({email:email},{$set:{token:randomString}});
            sendRestPasswordMail(userData.email,randomString);
            res.status(200).send({success:true,msg:"Please check your inbox of mail and reset your password."});
        }else{
            res.status(400).send({success:true,msg:"this email does not exists"});
        }
    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

const securePassword=async(password)=>{
    try{
        const passwordHash=await bcryptjs.hash(password,10);
        return passwordHash;
    }catch(error){
        throw new Error(error.message); // throw the error instead of sending a response
    }
}

const reset_password = async (req, res) => {
    try {
      const token = req.params.token;
      const tokenData = await User.findOne({ token:token });
      if (tokenData) {
        const password = req.body.password;
        const newPassword = await securePassword(password);
        const userData = await User.findByIdAndUpdate(
          { _id: tokenData._id },
          { $set: { password: newPassword, token: '' } },
          { new: true }
        );
        res.status(200).json({ success: true, msg: "User password has been reset" });
      } else {
        res.status(200).json({ success: true, msg: "This link has been expired." });
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
    }
  }

const loginAdmin_get=(req,res)=>{
    res.send('Admin Login Page');
}

const loginAdmin_post=async(req,res)=>{
    const {AdminEmail,PasswordAdmin}=req.body;
    try{
        const admin=await Hospital.login(AdminEmail,PasswordAdmin);
        const token=createTokenAdmin(admin._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.send(`Admin Space`)
    }
    catch(err){
        const errors=handleErrorsAdmin(err);
        res.status(400).json({errors});
    }
}

const logoutAdmin_get=async(req,res)=>{        //to change the value of the token to ''
    res.cookie('jwt','',{maxAge:1})    //expire at 1ms
    res.send('Home Page');
}


module.exports={
    login_get,
    login_post,
    logout_get,
    forget_password,
    reset_password,
    loginAdmin_get,
    loginAdmin_post,
    logoutAdmin_get
}


