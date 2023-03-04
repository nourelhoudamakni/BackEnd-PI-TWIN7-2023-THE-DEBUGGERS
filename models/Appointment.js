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
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;