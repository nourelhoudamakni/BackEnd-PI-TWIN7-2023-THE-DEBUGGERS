const mongoose=require("mongoose");
const SuperAdminSchema=new mongoose.Schema({
    
    SuperAdminEmail: {
        type: String,
    },
    PasswordSuperAdmin:
    {
        type: String,
    },
  
   
});
const SuperAdmin=mongoose.model("SuperAdmin",SuperAdminSchema);
module.exports=SuperAdmin;