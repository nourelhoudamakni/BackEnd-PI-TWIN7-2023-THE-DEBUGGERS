const express = require("express");
const router = express.Router();
const {addService , updateService , deleteService , getallServices , countServicesInHospital , getHospitalServices} = require("../controllers/serviceController");


router.post("/addservice/:hospitalId", addService);
router.put("/updateservice/:serviceId", updateService);
router.delete("/deleteservice/:serviceId",deleteService);
router.get("/getallservices",getallServices);
router.get("/countservicesinhospital/:hospitalId",countServicesInHospital);
router.get("/gethospitalservices/:hospitalId",getHospitalServices);

module.exports = router;
