const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const HospitalSchema=new mongoose.Schema({

    AdminEmail: {
        type: String,
        required:true,
        unique:true,
        match: /^Admin\.\w[1-9]@gmail\.com$/,
    },
    PasswordAdmin:
    {
        type: String,
        required:true,
    },
    HospitalName:
    {
        type:String,
    },
    HospitalAddress:
    {
        type:String,
    },
    PhoneNumber: {
        type: String,
        required:true,
    },
    Complaints:[{
        type:Schema.Types.ObjectId,
        ref:"Complaint"
    }],
    Administrator:{
        type:Schema.Types.ObjectId,
        ref:"Administrator"
    },
    Appointments:[{
        type:Schema.Types.ObjectId,
        ref:"Appointment"
    }],
    HospitalServices:[{
        type:Schema.Types.ObjectId,
        ref:"HospitalService"
    }]
});

const Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports=Hospital;