const mongoose=require("mongoose");
const medicalRecord=require('../models/MedicalRecord');
const path =require('path');
const user=require('../models/User'); 
const bcrypt = require('bcrypt');
const express = require('express');
require('dotenv');
 var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//update patient profile 
exports.updatePatient=async(req,res)=>{ 
    try{ 
        const patientId=req.params.userId; 
        console.log(patientId);
        const updatePatient=await user.findByIdAndUpdate(patientId,req.body)
        res.json(updatePatient);
        
    }catch(error){
        res.status(500).json(error.message); 
    }
}

// //Send : mobile verifications : 
exports.sendSms=async(req,res)=>{ 
    try { 
        const phone=req.body.phone; 
        const userId=req.params.userId;
        const userNumber=await user.findById(userId);
        userNumber.phoneNotVerif=phone;
        const crypto = require('crypto');
        const code = crypto.randomInt(1000000);
        userNumber.code=code; 
        await userNumber.save();
        client.messages.create({ 
            body:`Your OTP is ${code}`, 
            from:process.env.PHONE_NUMBER_TWILIO,
            to:`+${phone}`
        }).then(res.json(console.log(code)))
      
    }catch(error){ 
        res.status(500).json(error.message);
    }
}

//Receive : mobile verification : 
exports.verifNumber=async(req,res)=>{ 
     try{ 
        const codeEnter=req.body.codeEnter; 
        const userId=req.params.userId;
        const userNumber=await user.findById(userId);
        if (userNumber.code==codeEnter){ 
                userNumber.phoneNumber=userNumber.phoneNotVerif
                await userNumber.save();
                res.json(console.log("number verified !"));

        }else{ 
            res.status(400).json({error:"wrong confirm code"})
        }
     }catch(error){ 
        res.status(500).json(error.message); 
     }
}


//updateDoctorPassword 
exports.updateUserPassword=async(req,res)=>{ 
    try{
        const oldPassword=req.body.oldPassword; 
        const userId=req.params.userId; 
        const newPassword=req.body.newPassword; 
        const confirmNewPassword=req.body.confirmNewPassword; 
        const updatedUser=await user.findById(userId);
        console.log(updatedUser);
        bcrypt.compare(oldPassword,updatedUser.password).then((match)=>{ 
            if (!match){ 
                res.status(400).json({error:"Wrong password !"})
              }else{ 
                if(newPassword==confirmNewPassword){ 
                   bcrypt.hash(newPassword,10).then((hashedNewPassword)=>{ 
                    updatedUser.password=hashedNewPassword ;
                    res.json("password updated ! ")
                    updatedUser.save();
                   })
                }else{ 
                    res.status(400).json({error:"wrong confirm password"})
              }
              }
        })

    }catch(err){ 
        res.status(500).json(err.message);
    }
}


//get user by id : 
exports.getUserById=async(req,res)=>{ 
    try{
        const idUser=req.params.idUser;
        const userSearched=await user.findById(idUser);
        res.json(userSearched);
    }catch(err){ 
        res.status(500).json(err.message);
    }
}