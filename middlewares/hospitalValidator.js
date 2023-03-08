const yup=require("yup")
//const {findHospitalByEmail} =require("../controllers/HospitalController")
const HospitalModel=require("../models/Hospital")


async function validateHospital(req,res,next)
{
  try {
      const hospitalschema = yup.object().shape({
        AdminEmail: yup
          .string()
          .email('Email address format is invalid' )
          .matches(/^Admin\.[a-zA-Z0-9]+@gmail\.com$/, 'Email address invalid')
          .test('unique','email already exist!', async function(value) {
            if (!value) return true;
            try {
              const existingHospital= await HospitalModel.findOne({AdminEmail:value});
              return !existingHospital;
            } 
            catch (err) {
              return false;
            }
          })
          .required('email is required'),
      
        HospitalName:yup.string().required('hospital name is required'),
        HospitalAddress:yup.string().required(' Hospital Address name is required'),
        PhoneNumber:yup.number().min(8, 'The phone number must contain at least 8 characters').required(' phone number  is required'),
      
        PasswordAdmin:yup
          .string()
          .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/,
            'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial'
          )
          .required('Le mot de passe est obligatoire')
      });

    
        await hospitalschema.validate(req.body, { abortEarly: false });
        next();
      }

      
      catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
      }
      // ou bien je peux utiliser cette forme 
      //catch (error) {
      //   const errors = error.errors.map((err) => {
      //     return { message: err };
      //   });
      //   res.status(500).json(errors);
      // }
      //ou bien je peux utiliser cette forme 
      // catch (error) {
      //   const errors = {};
      //   if (error.inner) {
      //     for (let err of error.inner) {
      //       errors[err.path] = err.errors[0];
      //     }
      //   }
      //   res.status(400).json({ errors });
      // }
}
module.exports={validateHospital}