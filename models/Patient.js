const mongoose=require('mongoose');
const User=require('./User');


const PatientSchema = new mongoose.Schema({
});

const Patient = User.discriminator('Patient', PatientSchema);

  module.exports=Patient;