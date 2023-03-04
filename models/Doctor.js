const mongoose=require('mongoose');
const User=require('./User');


const DoctorSchema = new mongoose.Schema({
    WorkTime:{
    type:[Date]     
    }
  });

  const Doctor = User.discriminator('Doctor', DoctorSchema);

  module.exports=Doctor;