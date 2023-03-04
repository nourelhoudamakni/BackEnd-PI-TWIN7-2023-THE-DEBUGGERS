const ChatSchema=new mongoose.Schema({
    SenderId:String,
    ReciverId:String,
    Content:String,
    Date:Date,
});
const Chat=mongoose.model("chat",userSchema);

module.exports=Chat;