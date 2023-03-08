const HospitalServiceModel = require("../models/HospitalService");

// Add a new service
const addService = async (req, res, next) => {
  try {
    const { ServiceName, Description, EmailService, /* hospitalId */ } = req.body;
    const newService =  new HospitalServiceModel({
      ServiceName,
      Description,
      EmailService,
      //hospital: hospitalId,
    });
    const validationError = newService.validateSync();
    if (validationError) {
      throw new Error(validationError.message);
    }
      await newService.save();
    res.status(201).json("service added successfully");
  } 
  catch (err) {
 res.status(500).json({message: "Server error"});
  }
};

const updateService = async (req, res, next) => {
    try {
      const { ServiceName, Description, EmailService } = req.body;
      const { serviceId } = req.params;
  
      // Remove any whitespace characters from the serviceId parameter value
      const trimmedServiceId = serviceId.trim();
  
      const updatedService = await HospitalServiceModel.findByIdAndUpdate(
        trimmedServiceId,
        {
          $set: { ServiceName, Description, EmailService},
        },
        { new: true }
      );
  
      if (!updatedService) {
        throw new Error(`Could not update service with ID ${trimmedServiceId}`);
      }
  
      res.json(updatedService);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  const deleteService = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const checkIfServiceExist = await HospitalServiceModel.findById(serviceId);
        if (!checkIfServiceExist) {
          throw new Error("service not found");
        }
        await HospitalServiceModel.findByIdAndDelete(serviceId);
        res.json("service deleted!");
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
  };
  
  const getallServices = async (req, res, next) => {
    try {
      const servs  = await HospitalServiceModel.find({ });
      res.status(200).json(servs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
module.exports = {
    addService,
    updateService,
    deleteService,
    getallServices
  };
