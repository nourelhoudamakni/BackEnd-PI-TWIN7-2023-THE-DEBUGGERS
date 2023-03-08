const express= require("express");
const router= express.Router();
const {validateHospital}=require("../middlewares/hospitalValidator");
const
{
    addHospitalWithAdmin,
    updateHospital,
    deleteHospital,
    getAllHospitals,
    getHospitalById
}=require("../controllers/HospitalController")


  
router.post('/addHospitalwithAdmin',validateHospital,addHospitalWithAdmin)
router.get('/getAllHospitals',getAllHospitals)
router.get('/getHospitalById/:hospitalId',getHospitalById)
router.put('/updateHospital/:hospitalId',validateHospital,updateHospital)
router.delete('/deleteHospital/:hospitalId',deleteHospital)

module.exports=router;