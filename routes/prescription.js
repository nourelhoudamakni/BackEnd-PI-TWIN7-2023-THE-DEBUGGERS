const express = require("express");
const router = express.Router();
const{
    addPrescriptionwithDoctorAndPatient,
    addFileToPrescription,
    deleteFileOfPrescription,
    updatePrescription,
    deletePrescription,
    getAllPrescriptionsByIdDoctor,
    getAllPrescriptionsByIdPatient,
    DoctorSignature,
    
}=require('../controllers/prescriptionController')

///////////////////////////////////
router.post('/addPrescriptionwithDoctorAndPatient/:idDoctor/:idPatient',addPrescriptionwithDoctorAndPatient)
/////////////////////////////////////
router.put('/addFileToPrescription/:PrescriptionId',DoctorSignature,addFileToPrescription)
router.put('/updatePrescription/:PrescriptionId',updatePrescription)
/////////////////////////////////////
router.delete('/deleteFileOfPrescription/:PrescriptionId/:fileName',deleteFileOfPrescription)
router.delete('/deletePrescription/:idPrescription',deletePrescription)
/////////////////////////////////////
router.get('/getAllPrescriptionsByIdDoctor/:idDoctor',getAllPrescriptionsByIdDoctor)
router.get('/getAllPrescriptionsByIdPatient/:idPatient',getAllPrescriptionsByIdPatient)


module.exports = router;