const DoctorModel = require('../models/Doctor');
const PatientModel = require('../models/Patient');
const UserModel = require('../models/User');

const getDoctorsConfirmedValidated = async (req, res, next) => {
  try {
    const confirmedValidatedDoctors  = await UserModel.find({  confirmed: true, IsValidated: true , "role": "doctor" });
    res.status(200).json(confirmedValidatedDoctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getDoctorsConfirmedNonValidated = async (req, res, next) => {
    try {
      const confirmedNonValidatedDoctors  = await UserModel.find({  confirmed: true, IsValidated: false ,  "role": "doctor" });
      res.status(200).json(confirmedNonValidatedDoctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const validateDoctor = async (req, res, next) => {
    try {
        const {doctorId }= req.params;
        const trimmedDoctorId = doctorId.trim();
        const updatedDoctor = await UserModel.findByIdAndUpdate(
          trimmedDoctorId,
          { isValidated: true },
          { new: true }
        );
        console.log(trimmedDoctorId);
        if (!updatedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        return res.status(200).json(updatedDoctor);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
    };

    
    const getConfirmedPatients = async (req, res, next) => {
        try {
          const confirmedPatients = await UserModel.find({ confirmed: true , "role": "patient"});
          res.status(200).json(confirmedPatients);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        }
      };

      const getPatientByName = async (req, res, next) => {
        const { name } = req.params;
        try {
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
module.exports = {getDoctorsConfirmedValidated , getDoctorsConfirmedNonValidated , validateDoctor , getConfirmedPatients , getPatientByName } ;