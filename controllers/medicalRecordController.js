const mongoose=require("mongoose");
const medicalRecord=require('../models/MedicalRecord');
const multer = require('multer');
const path =require('path');
const user=require('../models/User'); 
const bcrypt = require('bcrypt');

// UPLOADS FILES USING MULTER 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  });

 exports.upload = multer({ storage: storage }).single('file');

//ADD MEDICAL RECORD FUNCTION 

exports.addMedicalRecord = async (req, res) => {
    try {
        // Récupération des données de la requête
        const { 
            gender, 
            email, 
            country, 
            profession, 
            civilState, 
            numberOfChildren, 
            dateOfBirth, 
            placeOfBirth, 
            bloodGroups, 
            weight, 
            size, 
            arterialPressure, 
            category, 
            disease, 
            allergies, 
            phoneNumber, 
            lastDoctorProvider, 
            treatmentPlan 
        } = req.body;

        // Création d'un nouveau MedicalRecord
        const newMedicalRecord = new medicalRecord({
            gender, 
            email, 
            country, 
            profession, 
            civilState, 
            numberOfChildren, 
            dateOfBirth, 
            placeOfBirth, 
            bloodGroups, 
            weight, 
            size, 
            arterialPressure, 
            category, 
            disease, 
            allergies, 
            phoneNumber, 
            lastDoctorProvider, 
            treatmentPlan 
        });

        if (req.file) {
            newMedicalRecord.files.push(req.file.originalname);
        }

        await newMedicalRecord.save();
        res.json(newMedicalRecord.toObject());  
    } catch(err) { 
        res.status(500).json(err.message);
    }
};



//UPDATE MEDICAL RECORD

exports.updateMedicalRecord=async (req,res)=>{ 
    try{
        const { medicalRecordId}=req.params;
        const updatedMedicalRecord=await medicalRecord.findByIdAndUpdate(medicalRecordId,req.body); 
        res.json(updatedMedicalRecord);
        if (req.file){ 
            updatedMedicalRecord.files.push(req.file.originalname);
            updatedMedicalRecord.save();
        }
        
    }catch(error){ 
        res.status(500).json(error.message); 
    }   
}

//DELETE MEDICAL RECORD 

exports.deleteMedicalRecord=async (req ,res)=>{ 
    try{ 
        const {medicalRecordId}=req.params; 
        const deleteMedicalRecord=await medicalRecord.findByIdAndDelete(medicalRecordId); 
        res.json(deleteMedicalRecord);
    }catch(error) {
        res.status(500).json(error.message);
    }
} 
 
// DELETE FILES : 
exports.deleteFileOfMedicalRecord=async (req,res)=>{ 
    try{ 
        const {fileName}=req.params;
        console.log(fileName)
        const {medicalRecordId}=req.params; 
        const medicalRecordOfFile=await medicalRecord.findById(medicalRecordId);
        const updatedFiles=medicalRecordOfFile.files.filter(file=>file!=fileName);
        medicalRecordOfFile.files=updatedFiles; 
        medicalRecordOfFile.save();       
        res.json("file deleted successfully !")
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//update patient profile 
exports.updatePatient=async(req,res)=>{ 
try{ 
    const {patientId}=req.params; 
    const updatePatient=await user.findByIdAndUpdate(patientId,req.body)
    res.json(updatePatient);
    
}catch(error){
    res.status(500).json(error.message); 
}
}


//update Doctors profile 
exports.updateDoctor=async(req,res)=>{ 
    try{ 
        const {doctorId}=req.params; 
        const updateDoctor=await user.findByIdAndUpdate(doctorId,req.body);
        res.json(updateDoctor);
    }catch(error){
        res.status(500).json(error.message); 
    }
}
//updateUserPassword 
exports.updateUserPassword=async(req,res)=>{ 
    try{
        const oldPassword=req.body.oldPassword; 
        const userId=req.params; 
        const newPassword=req.body.newPassword; 
        const confirmNewPassword=req.body.confirmNewPassword; 
        const updatedUser=await user.findById(userId); 
        bcrypt.compare(oldPassword,updatedUser.password).then((match)=>{ 
            if (!match){ 
                res.status(400).json({error:"Wrong password !"})
              }else{ 
                if(newPassword==confirmNewPassword){ 
                   bcrypt.hash(newPassword,10).then((hashedNewPassword)=>{ 
                    updatedUser.password=hashedNewPassword 
                    res.json("password updated ! ")
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

//PatientList 

exports.patientList=async(req,res)=>{  
    try{ 
    const patientList =await user.find({role:'Patient'});
    res.json(patientList) 
    }catch(error){
      res.status(500).json(error.message); 
    }
}
    