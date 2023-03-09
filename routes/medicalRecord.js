const express=require('express'); 
const router=express.Router(); 
const medicalRecordControlleur =require('../controllers/medicalRecordController'); 
router.post("/add",medicalRecordControlleur.upload,medicalRecordControlleur.addMedicalRecord);
router.put("/update/:medicalRecordId",medicalRecordControlleur.upload,medicalRecordControlleur.updateMedicalRecord); 
router.delete("/delete/:medicalRecordId",medicalRecordControlleur.deleteMedicalRecord); 
router.delete("/deleteMedicalDocument/:medicalRecordId/:fileName",medicalRecordControlleur.deleteFileOfMedicalRecord);
router.put("/updatePatient/:patientId",medicalRecordControlleur.updatePatient);
router.put("/updateDoctor/:doctorId",medicalRecordControlleur.updateDoctor);
router.put("/updatePasswordUser/:userId",medicalRecordControlleur.updateUserPassword);
router.post("/sendSms/:userId",medicalRecordControlleur.sendSms); 
router.post("/verifSms/:userId",medicalRecordControlleur.verifNumber);
router.put("/updateDoctor/:userId",medicalRecordControlleur.updateDoctor);
router.put("/updatePatient/:userId",medicalRecordControlleur.updatePatient);

module.exports = router;