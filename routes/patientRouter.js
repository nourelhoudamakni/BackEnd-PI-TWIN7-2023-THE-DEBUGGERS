const express=require('express'); 
const router=express.Router(); 
const patientControlleur =require('../controllers/patientController'); 
router.post("/sendSms/:userId",patientControlleur.sendSms); 
router.post("/verifSms/:userId",patientControlleur.verifNumber);
router.put("/updatePatient/:userId",patientControlleur.updatePatient);
router.put("/updatePasswordPatient/:userId",patientControlleur.updateUserPassword);
router.get("/getUserById/:idUser",patientControlleur.getUserById);
router.post("/addAppointment/:idPatient",patientControlleur.addAppointments);
router.get("/getAppointment/:idPatient",patientControlleur.getAppointmentByIdPatient);
router.get("/searchAppointment",patientControlleur.searchForAppointmentByTitle);
router.get("/sortAppointment",patientControlleur.sortForAppointment);
router.delete("/deleteAppointment/:idPatient",patientControlleur.deleteAppointmentFromPatient);
router.get("/notification/:idPatient",patientControlleur.notificationBeforeTheAppointment);

module.exports = router;