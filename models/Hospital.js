const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema;

const HospitalSchema=new mongoose.Schema({

    AdminEmail: {
        type: String,
        required:true,
        unique:true,
        match: /^Admin\.[a-zA-Z0-9]+@gmail\.com$/,
    },
    PasswordAdmin:
    {
        type: String,
        required:true,
    },
    HospitalName:
    {
        type:String,
        required:true,
    },
    HospitalAddress:
    {
        type:String,
        required:true,
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


HospitalSchema.statics.login=async function(AdminEmail,PasswordAdmin){            //compare email and password to login
    const admin=await this.findOne({AdminEmail})
    if(admin){
        const auth= await bcrypt.compare(PasswordAdmin,admin.PasswordAdmin)         //to compare admin password with the stocked password in the database if true:pass if false:dosent pass
        if(auth){
            return admin
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports=Hospital;