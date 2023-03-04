const mongoose=require("mongoose");
const AdminSchema=new mongoose.Schema({
    AdminEmail: {
        type: String,
    },
    PasswordAdmin:
    {
        type: String,
    },
    ConfirmPasswordAdmin: {
        type: String
    },
    PhoneNumber: {
        type: String
    }
});
const Administrator=mongoose.Model("Administrator",AdminSchema);
module.exports=Administrator;