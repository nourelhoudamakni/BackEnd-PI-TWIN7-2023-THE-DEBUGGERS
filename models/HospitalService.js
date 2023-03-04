const mongoose=require("mongoose");
const HospitalServiceSchema=new mongoose.Schema({
    ServiceName: {
        type: String,
    },
    Description: {
        type: String,
    },
    EmailService: {
        type:String,
    }
});
const HospitalService=mongoose.Model("HospitalService",HospitalServiceSchema);
module.exports=HospitalService;