const mongoose=require('mongoose');
const User=require('./User');


const PatientSchema = new mongoose.Schema({
  Complaints:[{
    type:Schema.Types.ObjectId,
    ref:"Complaint"
  }],
  Appointments:[{
    type:Schema.Types.ObjectId,
    ref:"Appointment"
  }],
  Notifications:[{
    type:Schema.Types.ObjectId,
    ref:"Notifications"
  }],
  Chats:[{
    type:Schema.Types.ObjectId,
    ref:"Chat"
  }],
  MedicalRecord:{
    type:Schema.Types.ObjectId,
    ref:"MedicalRecord"
  },
  Doctors:[{
    type:Schema.Types.ObjectId,
    ref:"Doctor"
  }],

});

const Patient = User.discriminator('Patient', PatientSchema);
module.exports=Patient;