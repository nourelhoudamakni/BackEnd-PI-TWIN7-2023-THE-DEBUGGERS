const express = require('express');
var router = express.Router();
const { signUpFunction } = require('../controllers/signUpController');
const { emailVaidationFunction } = require('../controllers/emailValidation');
const app = express();
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const MedicalRecord = require('../models/MedicalRecord');
const User =require('../models/User');
const { VariableInstance } = require('twilio/lib/rest/serverless/v1/service/environment/variable');

const maxAge= 3 * 24 * 60 * 60 




const EMAIL_SECRET = 'mysecretemail';


router.post('/', signUpFunction);

// Endpoint for email verification
router.get('/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
      res.cookie('jwt',req.params.token,{httpOnly:true,maxAge:maxAge*1000})
  
      // Update the confirmed flag for the patient
      const patient = await Patient.findByIdAndUpdate(id, {
        $set: { confirmed: true },
      }, { new: true });
      if(patient){
        const medicalRecord = await MedicalRecord.create({
            gender: patient.gender,
            email: patient.email,
            dateOfBirth: patient.dateOfBirth,
            Patient: patient._id,
          })
        // Associate medical record with patient
      await Patient.findByIdAndUpdate(id, {
        $set: { MedicalRecord: medicalRecord._id },
      }, { new: true });
      };
      if (!patient) {
        const doctor = await Doctor.findByIdAndUpdate(id, {
          $set: { confirmed: true },
        }, { new: true })
        if (!doctor) {
          return res.json('doctor not found !');
        }
      }
  

  

  
      // Redirect to home page
      res.redirect('http://localhost:3000/home')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router