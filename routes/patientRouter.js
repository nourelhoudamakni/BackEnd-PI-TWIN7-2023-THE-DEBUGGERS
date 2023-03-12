const express=require('express'); 
const router=express.Router(); 
const patientControlleur =require('../controllers/patientController'); 
router.post("/sendSms/:userId",patientControlleur.sendSms); 
router.post("/verifSms/:userId",patientControlleur.verifNumber);
router.put("/updatePatient/:userId",patientControlleur.updatePatient);
router.put("/updatePasswordPatient/:userId",patientControlleur.updateUserPassword);
router.get("/getUserById/:idUser",patientControlleur.getUserById);
module.exports = router;