const { Schema } = require("mongoose");

const HospitalSchema=new mongoose.Schema({
    HospitalName:String,
    HospitalAddress:String,
    Complaints:[{
        type:Schema.Types.ObjectId,
        ref:"Complaint"
    }]
});

const Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports=Hospital;