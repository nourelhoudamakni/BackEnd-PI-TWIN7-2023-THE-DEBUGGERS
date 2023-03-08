const express = require("express");
const router = express.Router();
const {addService , updateService , deleteService , getallServices } = require("../controllers/serviceController");


router.post("/addservice", addService);
router.put("/updateservice/:serviceId", updateService);
router.delete("/deleteservice/:serviceId",deleteService);
router.get("/getallservices",getallServices);
module.exports = router;
