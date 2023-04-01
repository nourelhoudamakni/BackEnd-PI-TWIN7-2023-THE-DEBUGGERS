const mongoose=required("mongoose"); 
const Schema=mongoose.Schema;
const prescriptionSchema=new mongoose.Schema({ 
    
    DateOfMd:{ 
        type:Date, 
        required:true
    }, 
    DoctorName:{ 
        type:String, 
        required:true  
    }, 
    DoctorLastName:{ 
        type:String, 
        required:true
    }, 
    Treatments:{ 
        type:String, 
        required:true
    }, 
    Instruction:{ 
        type:String,
        required:true
    }, 
    Note:{ 
        type:String, 
        required:true
    }, 
    Signature:{ 
        type:String, 
        required:true
    },
    Doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    },
    MedicalRecords:{
        type:Schema.Types.ObjectId,
        ref:"MedicalRecord"
    },
})
const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;