const mongoose=require("mongoose");
const Hospital = require("./Hospital");
const HospitalServiceSchema=new mongoose.Schema({
    ServiceName: {
        type: String,
    },
    Description: {
        type: String,
    },
    EmailService: {
        type:String,
    },
    Hospital:{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
    },
    Doctors:[{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    }],
    Appointments:[{
        type:Schema.Types.ObjectId,
        ref:"Appointment"
    }]
});
const HospitalService=mongoose.Model("HospitalService",HospitalServiceSchema);
module.exports=HospitalService;