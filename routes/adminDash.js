const express = require("express");
const router = express.Router();
const {getDoctorsConfirmedValidated , getDoctorsConfirmedNonValidated , validateDoctor , getConfirmedPatients , getPatientByName } = require("../controllers/adminDashCont");

router.get("/getdoctorsconfirmedvalidated", getDoctorsConfirmedValidated);
router.get("/getdoctorsconfirmednonvalidated", getDoctorsConfirmedNonValidated);
router.put("/validatedoctor/:doctorId",validateDoctor);
router.get("/getconfirmedpatients", getConfirmedPatients);
router.get("/getpatientbyname/:name", getPatientByName);

getPatientByName
module.exports = router;
