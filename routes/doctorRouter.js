const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { getAppointments } = require('../controllers/doctorController');
const { getAppointmentById } = require('../controllers/doctorController');
const { updateAppointment } = require('../controllers/doctorController');
const { validateAppointment } = require('../controllers/doctorController');


router.post("/sendSms/:userId", doctorController.sendSms);
router.post("/verifSms/:userId", doctorController.verifNumber);
router.put("/updateDoctor/:userId", doctorController.updateDoctor);
router.put("/updatePasswordDoctor/:userId", doctorController.updateUserPassword);

router.get("/appointments", getAppointments);
router.get("/appointments/:appointmentId", getAppointmentById);
router.put("/appointments/:appointmentId", updateAppointment);
router.put("/appointments/:appointmentId/verifie", validateAppointment);
module.exports = router;