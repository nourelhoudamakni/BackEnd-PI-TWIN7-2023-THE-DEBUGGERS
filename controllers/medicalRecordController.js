const mongoose=require("mongoose");
const medicalRecord=require('../models/MedicalRecord')


//ADD MEDICAL RECORD FUNCTION 
exports.addMedicalRecord = async (req, res) => { 
    try {
        const medicalRecordBody = req.body; 
        const newMedicalRecord = new medicalRecord(medicalRecordBody);
        await newMedicalRecord.save();
        res.json(newMedicalRecord.toObject());  
    } catch(err) { 
        res.status(500).json(err.message);
    }
}