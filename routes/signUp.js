const express=require('express');
var router=express.Router();
const {signUpFunction}=require('../controllers/signUpController');
const {emailVaidationFunction}=require('../controllers/emailValidation');
const app=express();

router.post('/',signUpFunction);
// Endpoint for email verification
router.get('/email/confirmation/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
  
      // Update the confirmed flag for the patient
      await Patient.update({ confirmed: true }, { where: { id } });
  
      res.status(200).json({ message: 'Email confirmed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports=router