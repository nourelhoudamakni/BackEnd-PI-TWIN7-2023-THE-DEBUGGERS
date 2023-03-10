const DoctorModel = require('../models/Doctor');
const PatientModel = require('../models/Patient');
const UserModel = require('../models/User');

// This function gets all confirmed and validated doctors
const getDoctorsConfirmedValidated = async (req, res, next) => {
  try {
    // search for all documents where confirmed is true, IsValidated is true, and role is doctor
    const confirmedValidatedDoctors  = await UserModel.find({  confirmed: true, IsValidated: true , "role": "doctor" });
    res.status(200).json(confirmedValidatedDoctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// This function gets all confirmed but non-validated doctors
const getDoctorsConfirmedNonValidated = async (req, res, next) => {
    try {
      // search for all documents where confirmed is true, IsValidated is false, and role is doctor
      const confirmedNonValidatedDoctors  = await UserModel.find({  confirmed: true, IsValidated: false ,  "role": "doctor" });
      res.status(200).json(confirmedNonValidatedDoctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };


// This function validates a doctor by updating the isValidated field to true in the database

  const validateDoctor = async (req, res, next) => {
    try {

      // Extract the doctor ID from the request parameters

        const {doctorId }= req.params;
        // Trim any whitespace from the ID
        const trimmedDoctorId = doctorId.trim();
            
        // Find the doctor with the specified ID and update their isValidated field to true
        const updatedDoctor = await UserModel.findByIdAndUpdate(
          trimmedDoctorId,
          { isValidated: true },
          { new: true }
        );
        
        // If no doctor is found with the specified ID, return a 404 error
        if (!updatedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        // Return the updated doctor object with a 200 status code
        return res.status(200).json(updatedDoctor);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
    };

    // This function gets all confirmed patients

    const getConfirmedPatients = async (req, res, next) => {
        try {
          const confirmedPatients = await UserModel.find({ confirmed: true , "role": "patient"});
          res.status(200).json(confirmedPatients);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };


      // Retrieves a list of patients whose first or last name matches the given name parameter

      const getPatientByName = async (req, res, next) => {
        // extract name parameter from request parameters
        const { name } = req.params;
        try {
          // Find patients whose first or last name matches the given name using case-insensitive regex matching
          const patients = await UserModel.find({
            $or: [
              { firstName: { $regex: name, $options: 'i' } },
              { lastName: { $regex: name, $options: 'i' } },
            ], "role": "patient"
          });
          res.status(200).json(patients);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };

      const countPatient = async (req, res, next) => {
        try {
          const count = await UserModel.countDocuments({ confirmed: true , "role": "patient" });
          res.status(200).json({ count });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };

      const countDoctorValidated = async (req, res, next) => {
        try {
          const count = await UserModel.countDocuments({ confirmed: true, IsValidated: true , "role": "doctor" });
          res.status(200).json({ count });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };
      
module.exports = {getDoctorsConfirmedValidated , getDoctorsConfirmedNonValidated , validateDoctor , getConfirmedPatients , getPatientByName , countPatient , countDoctorValidated} ;