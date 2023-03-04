const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ChatSchema=new mongoose.Schema({
    SenderId:String,
    ReciverId:String,
    Content:String,
    Date:Date,
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports=Chat;