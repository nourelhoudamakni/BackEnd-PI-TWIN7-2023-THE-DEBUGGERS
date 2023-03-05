const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const  MedicalRecordSchema=new mongoose.Schema({ 
    patientName:{ 
        type:String,
        required:true
    },
    patientLastName:{ 
        type:String,
        required:true
    },
    gender:{
        type:String, 
        enum:['MALE','FEMALE'],
        required:true
    }, 
    email:{ 
        type:String,
        required:true
    },
    country:{ 
        type:String, 
        enum:["Tunisie","algeria"],
        required:true 
    },
    profession:{ 
        type:String, 
        required:true,
    },
    civilState:{ 
        type:String, 
        enum:["MARRIED","SINGLE","DIVORCED"],
        required:true
    }, 
    numberOfChildren:{  
        type :Number , 
        required:true
    },
    dateOfBirth:{ 
        type:Date , 
        required:true
    },
    placeOfBirth:{ 
        type:String, 
        enum:["Tunis","Bizerte"], 
        required:true
    },
    bloodGroups:{ 
        type:String, 
        enum:["A","B","AB","O"], 
        required:true
    },
    weight:{ 
        type:Number, 
        required:true

    },
    size:{
        type:Number, 
        required:true
    }, 
    arterialPressure:{ 
        type:Number, 
        required:true
    },
    category:{ 
        type:String, 
        enum:["Temperature","Blood pressure","Heart rate","Respiratory rate","Oxygen_saturation","Pain"], 
        required:true
    },
    disease:{ 
        type:String, 
        enum:["Hypertension","Hypotension","Fever","Tachycardia","Bradycardia","Respiratory diseases","Pain"],
        required:true
    },
    allergies:{ 
        type:String, 
        enum:["Anaphylaxis","Asthma","Allergic rhinitis","Food allergies"],
        required:true
    },
    files:{ 
        type:[String],
        required:true
    },
    phoneNumber:{ 
        type:String, 
        required:true
    },
    lastDoctorProvider:{ 
        type:String,
        required:true
    },
    treatmentPlan:{ 
        type:String, 
        required:true
    },
    Doctors:[{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    }],
    Patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient"
    },
    prescription:[{
        type:Schema.Types.ObjectId,
        ref:"Prescription"
    }]
})
const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);
module.exports = MedicalRecord;