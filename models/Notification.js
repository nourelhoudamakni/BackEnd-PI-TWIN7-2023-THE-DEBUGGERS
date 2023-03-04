const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const NotificationSchema=new mongoose.Schema({
    Title:String,
    Date:Date,
    Content:String
});

const Notification=mongoose.model("notification",NotificationSchema);
module.exports=Notification;