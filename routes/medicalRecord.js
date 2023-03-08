const express=require('express'); 
const router=express.Router(); 
const medicalRecordControlleur =require('../controllers/medicalRecordController'); 
router.post("/add",medicalRecordControlleur.upload,medicalRecordControlleur.addMedicalRecord);
router.put("/update/:medicalRecordId",medicalRecordControlleur.upload,medicalRecordControlleur.updateMedicalRecord)
module.exports = router;