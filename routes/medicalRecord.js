const express=require('express'); 
const router=express.Router(); 
const medicalRecordControlleur =require('../controllers/medicalRecordController'); 
router.post("/add",medicalRecordControlleur.addMedicalRecord);
module.exports = router;