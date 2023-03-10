const express=require('express'); 
const router=express.Router(); 
const doctorController =require('../controllers/doctorController'); 
router.post("/sendSms/:userId",doctorController.sendSms); 
router.post("/verifSms/:userId",doctorController.verifNumber);
router.put("/updateDoctor/:userId",doctorController.updateDoctor);
router.put("/updatePasswordDoctor/:userId",doctorController.updateUserPassword);
module.exports = router;