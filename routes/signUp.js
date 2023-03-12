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





const EMAIL_SECRET = 'mysecretemail';


router.post('/:idServ?', signUpFunction);
router.get('/hospital',async(req,res)=>{
    const patient= await Patient.findById('640bbaa5ea108a208a853dce');
    console.log(patient.userName);
})

// Endpoint for email verification
router.get('/:token', async (req, res) => {
    try {
        const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);


        // Update the confirmed flag for the patient
        //   await Patient.update({ confirmed: true }, { where: { id } });
        const patient = await Patient.findByIdAndUpdate(id,
            {
                $set: { confirmed: true },
            },
            { new: true }
        );
          //creation du medical record avec la creation du user
          const medicalRecord= await MedicalRecord.create({
            gender: patient.gender,
            email: patient.email,
            dateOfBirth: patient.dateOfBirth,
            Patient: patient._id,
        });

        await Patient.findByIdAndUpdate(id,
            {
                $set: { MedicalRecord: medicalRecord._id },
            },
            { new: true }
        );
        if (!patient) {
            const doctor = await Doctor.findByIdAndUpdate(id,
                {
                    $set: { confirmed: true },
                },
                { new: true }
            )
            return (res.status(200).json(`Email confirmed successfully, WELCOME, please wait for the validation of your account`));
        }

        return (res.status(200).json(`Email confirmed successfully, WELCOME`));


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router