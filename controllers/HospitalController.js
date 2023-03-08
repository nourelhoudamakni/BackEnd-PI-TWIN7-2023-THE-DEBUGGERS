const HospitalModel = require("../models/Hospital")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const addHospitalWithAdmin = async (req, res, next) => {
    try {
        const { AdminEmail, PasswordAdmin, confirmPasswordAdmin, HospitalName, HospitalAddress, PhoneNumber } = req.body

        /////verifier si les parametres sont presents dans req.body
        if (!AdminEmail || !PasswordAdmin ||  !confirmPasswordAdmin || !HospitalName || !HospitalAddress || !PhoneNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (PasswordAdmin != confirmPasswordAdmin) {
            return res.status(400).json({ message: "Wrong password confirmation !" });
        }

        else {
            bcrypt
                .hash(PasswordAdmin, 10)
                .then((hashedPasswords) => {
                    const newHospital = HospitalModel.create({
                        AdminEmail,
                        PasswordAdmin: hashedPasswords,
                        HospitalName,
                        HospitalAddress,
                        PhoneNumber,
                    });

                    if (!newHospital) {

                        return res.status(400).json({ message: "error while adding Hospital in the DB!" });
                    }
                })
        }
        res.status(200).json("hospital added successfully !")
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}




const getAllHospitals = async (req, res, next) => {
    try {

        const hospitals = await HospitalModel.find();
        if (!hospitals) {
            return res.status(404).json({ message: "Hospitals not found" });
        }
        if (hospitals.length === 0) {
            return res.status(404).json({ message: "Hlist of hospitals is empty !" });
        }
        res.status(200).json(hospitals);

    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getHospitalById = async (req, res, next) => {
    try {
        const { hospitalId } = req.params
        const hospital = await HospitalModel.findById(hospitalId)
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.status(200).json(hospital);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}


const updateHospital = async (req, res, next) => {
    try {
        const { hospitalId } = req.params;
        const { AdminEmail, OldPasswordAdmin, PasswordAdmin, confirmPasswordAdmin, HospitalName, HospitalAddress, PhoneNumber } = req.body;



        /////verifier si les parametres sont presents dans req.body
        if (!AdminEmail || !OldPasswordAdmin || !PasswordAdmin || !confirmPasswordAdmin || !HospitalName || !HospitalAddress || !PhoneNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const Hospital = await HospitalModel.findById(hospitalId)
        if (!Hospital) {
            return res.status(404).json({ message: "hospistal not found !" });
        }

        const isOldPasswordCorrect = await bcrypt.compare(OldPasswordAdmin, Hospital.PasswordAdmin);
        if (!isOldPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect old password !" });
        }


        if (PasswordAdmin !== confirmPasswordAdmin) {
            return res.status(400).json({ message: "Wrong password confirmation !" });
        }



        const updateHospital = await HospitalModel.findByIdAndUpdate(
            hospitalId,
            {
                $set: { AdminEmail, PasswordAdmin, HospitalName, HospitalAddress, PhoneNumber },
            },
            { new: true }

        )
        if (!updateHospital) {
            return res.status(400).json({ message: `Hospital not found with id ${hospitalId}` });
        }

        res.status(200).json(updateHospital);
    }
    catch (error) {
        res.status(500).json(error.message);
    }


};



const deleteHospital = async (req, res, next) => {
    const { hospitalId } = req.params;
    try {
        if (!hospitalId) {
            return res.status(400).json({ message: "Missing required field" });
        }

        const HospitalToDelte = await HospitalModel.findById(hospitalId);
        if (!HospitalToDelte) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        const Hospital = await HospitalModel.findByIdAndDelete(hospitalId)
        if (!Hospital) {
            return res.status(400).json({ message: `Hospital not found with id ${hospitalId}` });
        }
        res.status(200).json("Hospital deleted successfully! ")
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};



module.exports = {
    addHospitalWithAdmin,
    updateHospital,
    deleteHospital,
    getAllHospitals,
    getHospitalById,

}

