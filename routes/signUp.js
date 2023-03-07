const express=require('express');
var router=express.Router();
const {signUpFunction}=require('../controllers/signUpController');
const {emailVaidationFunction}=require('../controllers/emailValidation');
const app=express();
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');



const EMAIL_SECRET='mysecretemail';


router.post('/',signUpFunction);
// Endpoint for email verification
router.get('/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
  
      // Update the confirmed flag for the patient
    //   await Patient.update({ confirmed: true }, { where: { id } });
    const patient=await Patient.findByIdAndUpdate(id,
          {
            $set: { confirmed:true },
          },
          { new: true }
        );
    if(!patient){
        const doctor=await Doctor.findByIdAndUpdate(id,
            {
              $set: { confirmed:true },
            },
            { new: true }
          )
          return (res.status(200).json(`Email confirmed successfully, WELCOME, please wait for the validation of your account`));
    }
  
      return(res.status(200).json(`Email confirmed successfully, WELCOME`));
    

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports=router