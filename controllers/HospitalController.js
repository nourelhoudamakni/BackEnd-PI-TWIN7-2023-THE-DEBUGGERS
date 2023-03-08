const HospitalModel = require("../models/Hospital")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const addHospitalWithAdmin = async (req, res, next) => {
    try {
        const { AdminEmail, PasswordAdmin, confirmPasswordAdmin, HospitalName, HospitalAddress, PhoneNumber } = req.body


        // if (!AdminEmail || !PasswordAdmin || !confirmPasswordAdmin || !HospitalName || !HospitalAddress || !PhoneNumber) {
        //     throw new Error("please verify your entries!");
        // }
        if (PasswordAdmin != confirmPasswordAdmin) {
            throw new Error("Wrong password confirmation!")
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
                        throw new Error("error while adding Hospital in the DB!");
                    }
                })
        }
        res.status(200).json("hospital added successfully !")
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

// async function findHospitalByEmail(email){
// const hospital= await HospitalModel.findOne({AdminEmail:email})
// return hospital;
// }


const getAllHospitals = async (req, res, next) => {
    try {

        const hospitals = await HospitalModel.find();
        if (!hospitals) {
            throw new Error("hospitals not found ! ");
        }
        if (hospitals.length === 0) {
            throw new Error("list of hospitals is empty ! ");
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
            throw new Error("hospital not found ! ");
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


        const Hospital = await HospitalModel.findById(hospitalId)
        if (!Hospital) {
            throw new Error("hospital not found ! ");
        }

        bcrypt.compare(OldPasswordAdmin,Hospital.PasswordAdmin )
        .then((result) => {
            if (result) {
                if (PasswordAdmin != confirmPasswordAdmin) {
                    throw new Error("Wrong password confirmation !");
                }
                else {
                     HospitalModel.findByIdAndUpdate(
                        hospitalId,
                        {
                            $set: { AdminEmail,PasswordAdmin, HospitalName, HospitalAddress, PhoneNumber },
                        },
                        { new: true }
            
                    )
                        .then((data) => {
                            if (!data) {
                                res.status(404).json(` Hospital not found with id ${hospitalId}`);
                            }
                            res.status(200).json(data);
                        })
                }
                }
            else 
            {
                throw new Error("verify your old password ! ");
            }
        })
    }
    catch (error) {
        res.status(500).json(error.message);
    }


};



const deleteHospital = async (req, res, next) => {
    const { hospitalId } = req.params;
    try {
        if (!hospitalId) {
            throw new Error("verify your entries ! ");
        }
        await HospitalModel.findByIdAndDelete(hospitalId)
            .then((data) => {
                if (!data) {
                    res.status(404).json(` Hospital not found with id ${hospitalId}`);
                }
            })
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

