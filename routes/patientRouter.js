const express=require('express'); 
const router=express.Router(); 
const patientControlleur =require('../controllers/patientController');
const {getHospitals} =require('../controllers/patientController');  
const {getHospitalServicesByHospitalId} =require('../controllers/patientController');  
const {getAppointmentsByHospitalServicesId} =require('../controllers/patientController');  
const {takeAppointment} =require('../controllers/patientController');  



router.post("/sendSms/:userId",patientControlleur.sendSms); 
router.post("/verifSms/:userId",patientControlleur.verifNumber);
router.put("/updatePatient/:userId",patientControlleur.updatePatient);
router.put("/updatePasswordPatient/:userId",patientControlleur.updateUserPassword);
router.get("/getUserById/:idUser",patientControlleur.getUserById);
router.get('/hospitals',getHospitals);
router.get('/services/:hospitalId',getHospitalServicesByHospitalId);
router.get('/appointments/:hospitalServiceId',getAppointmentsByHospitalServicesId);
router.put('/appointments/:appointmentId/take',takeAppointment);
router.post("/addAppointment/:idPatient",patientControlleur.addAppointments);
router.get("/getAppointment/:idPatient",patientControlleur.getAppointmentByIdPatient);
router.get("/searchAppointment",patientControlleur.searchForAppointmentByTitle);
router.get("/sortAppointment",patientControlleur.sortForAppointment);
router.delete("/deleteAppointment/:idPatient/:idAppointment",patientControlleur.deleteAppointmentFromPatient);
router.get("/notification/:idPatient",patientControlleur.notificationBeforeTheAppointment);
router.post("/getListDoctor",patientControlleur.getDoctorList);
router.put("/addImageProfile/:userId",patientControlleur.ProfileImage,patientControlleur.addImageToUserProfile);

module.exports = router;