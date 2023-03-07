const HospitalServiceModel = require("../models/HospitalService");

// Add a new service
const addService = async (req, res, next) => {
  try {
    const { ServiceName, Description, EmailService, /* hospitalId */ } = req.body;
    const newService = await HospitalServiceModel.create({
      ServiceName,
      Description,
      EmailService,
      //hospital: hospitalId,
    });
    await newService.save();
    if (!newService) {
        throw new Error("error while adding service in the DB!");
      }
    res.status(201).json("service added successfully");
  } 
  catch (err) {
 res.status(500).json(error.message);
  }
};

module.exports = {
    addService
  };
