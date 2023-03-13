const express=require('express'); 
const router=express.Router(); 
const medicalRecordControlleur =require('../controllers/medicalRecordController'); 

router.post("/add",medicalRecordControlleur.upload,medicalRecordControlleur.addMedicalRecord);
router.put("/update/:medicalRecordId",medicalRecordControlleur.upload,medicalRecordControlleur.updateMedicalRecord); 
router.post("/addFiles/:medicalRecordId",medicalRecordControlleur.upload,medicalRecordControlleur.addFilesToMedicalrecord)
router.delete("/delete/:medicalRecordId",medicalRecordControlleur.deleteMedicalRecord); 
router.delete("/deleteMedicalDocument/:medicalRecordId/:fileName",medicalRecordControlleur.deleteFileOfMedicalRecord);
router.get("/findMedicalRecordById/:MedicalId",medicalRecordControlleur.findMedicalRecordById)
module.exports = router;