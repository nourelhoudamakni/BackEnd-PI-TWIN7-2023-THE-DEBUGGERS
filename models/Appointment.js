const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const AppointmentSchema=new mongoose.Schema({
    FirstNamePatient:String,
    LastNamePatient:String,
    Titre:String,
    Date:Date,
    Heure:String,
    Symptoms:[String],
    Notes:String,
    Patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient"
    },
    HospitalService:{
        type:Schema.Types.ObjectId,
        ref:"HospitalService"
    },
    Doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    },
    Hospial:{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;