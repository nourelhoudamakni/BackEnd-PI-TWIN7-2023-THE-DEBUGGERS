const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const HospitalSchema=new mongoose.Schema({
    HospitalName:String,
    HospitalAddress:String,
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
    Hospitals:[{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
    }]
});

const Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports=Hospital;