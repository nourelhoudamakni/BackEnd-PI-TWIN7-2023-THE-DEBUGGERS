const mongoose=require("mongoose");
const medicalRecord=require('../models/MedicalRecord');
const path =require('path');
const user=require('../models/User'); 
const bcrypt = require('bcrypt');
const express = require('express');
const Hospital = require("../models/Hospital");
const HospitalService = require("../models/HospitalService");
const Appointment = require("../models/Appointment");

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
        setTimeout(expirationCode=()=>{ 
            userNumber.code=""; 
            userNumber.save(); 
        }, 29999);
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


//getHospitals List
exports.getHospitals=async(req,res)=>{
    try{
        const hospitals=await Hospital.find();
        res.json(hospitals);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

//getHospitalService List
exports.getHospitalServicesByHospitalId= async(req,res)=>{
    const {hospitalId}=req.params;
    try{
        const services=await HospitalService.find({Hospital:hospitalId});
        res.json(services);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

//getAppointments List
exports.getAppointmentsByHospitalServicesId= async(req,res)=>{
    const {hospitalServiceId}=req.params;
    try{
        const appointments=await Appointment.find({HospitalService:hospitalServiceId});
        res.json(appointments);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

//takeAppointment
exports.takeAppointment= async(req,res)=>{
    const { appointmentId } = req.params;
    const {patientId}=req.body;  //patient id recepurer depuis local storge

    try{
        const appointment= await Appointment.findById(appointmentId);
        if(!appointment){
            return res.status(404).json({message:"Appointment not found"})
        }
        appointment.Patient=patientId;
        await appointment.save();
        res.json(appointment);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}




