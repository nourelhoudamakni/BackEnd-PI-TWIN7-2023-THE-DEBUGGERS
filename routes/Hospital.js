const express= require("express");
const router= express.Router();
const {validateHospital,validateHospitalwhenUpdate}=require("../middlewares/hospitalValidator");
const
{
    addHospitalWithAdmin,
    updateHospital,
    deleteHospital,
    getAllHospitals,
    getHospitalById,
    calculerNbrHopitaux,
    countCompalintsByHospital,
    hospitalAvecPlusDeRendezVous,
    searchByHospitalName,
}=require("../controllers/HospitalController")


  
router.post('/addHospitalwithAdmin',validateHospital,addHospitalWithAdmin)
router.get('/getAllHospitals',getAllHospitals)
router.get('/getHospitalById/:hospitalId',getHospitalById)
router.get('/countHospitals',calculerNbrHopitaux)
router.get('/searchByHospitalName/:nameHospital',searchByHospitalName)
router.get('/hospitalAvecPlusDeRendezVous',hospitalAvecPlusDeRendezVous)
router.get('/countCompalintsByHospital',countCompalintsByHospital)
router.put('/updateHospital/:hospitalId',validateHospitalwhenUpdate,updateHospital)
router.delete('/deleteHospital/:hospitalId',deleteHospital)

module.exports=router;