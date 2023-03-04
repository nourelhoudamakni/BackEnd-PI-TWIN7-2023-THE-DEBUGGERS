const mongoose=required("mongoose"); 
const prescriptionSchema=new mongoose.Schema({ 
    patientName:{ 
        type:String, 
        required:true
    }, 
    patientLastName:{ 
        type:String, 
        required:true
    },
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
    }
})
const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;