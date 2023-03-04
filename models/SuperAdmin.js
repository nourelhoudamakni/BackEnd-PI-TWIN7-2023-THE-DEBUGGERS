const mongoose=require("mongoose");
const SuperAdminSchema=new mongoose.Schema({
    
    SuperAdminEmail: {
        type: String,
    },
    PasswordSuperAdmin:
    {
        type: String,
    },
    ConfirmPasswordSuperAdmin:
    {
        type: String,
    }
   
});
const SuperAdmin=mongoose.Model("SuperAdmin",SuperAdminSchema);
module.exports=SuperAdmin;