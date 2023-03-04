const NotificationSchema=new mongoose.Schema({
    Title:String,
    Date:Date,
    Content:String
});
const Notification=mongoose.model("notification",userSchema);

module.exports=Notification;