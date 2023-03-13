const mongoose=require("mongoose");
const medicalRecord=require('../models/MedicalRecord');
const multer = require('multer');
const user=require('../models/User'); 



// UPLOADS FILES USING MULTER 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
exports.upload = multer({ storage: storage }).array('file', 10);


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
    
        const updatedMedicalRecord=await medicalRecord.findByIdAndUpdate(medicalRecordId,req.body,{new:true}); 
        if(updatedMedicalRecord){
            res.json(updatedMedicalRecord);
        }
        
        if (req.file){ 
            updatedMedicalRecord.files.push(req.file.originalname);
            updatedMedicalRecord.save();

        }
        
    }catch(error){ 
        res.status(500).json(error.message); 
    }   
}

exports.addFilesToMedicalrecord=async (req,res)=>{ 
    try{
        const { medicalRecordId}=req.params;
        const MedicalRecord = await medicalRecord.findById(medicalRecordId)
        if (!MedicalRecord) {
             return res.status(404).json({ message: "MedicalRecord not found" });
            // throw new Error("Hospital not found");
        }
    
   
        if (req.file){ 
            MedicalRecord.files.push(req.file.originalname);
            MedicalRecord.save();

        }
        res.status(200).json({message:"files added"})
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


exports.findMedicalRecordById=async (req,res)=>{ 
    try {
        const { MedicalId } = req.params
        const MedicalRecord = await medicalRecord.findById(MedicalId)
        if (!MedicalRecord) {
             return res.status(404).json({ message: "MedicalRecord not found" });
            // throw new Error("Hospital not found");
        }
        res.status(200).json(MedicalRecord);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}







