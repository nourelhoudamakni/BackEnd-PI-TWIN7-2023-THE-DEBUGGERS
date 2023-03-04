const mongoose=require("mongoose");
const Schema=mongoose.Schema;

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
    },
    Hospital:{
        type:Schema.Types.ObjectId,
        ref:"Hospital"
    }
});
const Administrator=mongoose.Model("Administrator",AdminSchema);
module.exports=Administrator;