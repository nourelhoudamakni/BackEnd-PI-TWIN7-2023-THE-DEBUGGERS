const mongoose=require('mongoose');
const User=require('./User');
const Schema=mongoose.Schema;


const DoctorSchema = new mongoose.Schema({
    WorkTime:{
    type:[Date]     
    },
    Patients:[{
      type:Schema.Types.ObjectId,
      ref:"Patient"
    }],
    MedicalRecord:[{
      type:Schema.Types.ObjectId,
      ref:"MedicalRecord"
    }],
    Prescriptions:[{
      type:Schema.Types.ObjectId,
      ref:"Prescription"
    }],
    Notifications:[{
      type:Schema.Types.ObjectId,
      ref:"Notification"
    }],
    Chats:[{
      type:Schema.Types.ObjectId,
      ref:"Chat"
    }],
    Appointments:[{
      type:Schema.Types.ObjectId,
      ref:"Appointment"
    }],
    Service:{
      type:Schema.Types.ObjectId,
      ref:"HospitalService"
  }
  });

  const Doctor = User.discriminator('Doctor', DoctorSchema);

  module.exports=Doctor;