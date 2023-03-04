const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ChatSchema=new mongoose.Schema({
    SenderId:String,
    ReciverId:String,
    Content:String,
    Date:Date,
    Patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient"
    },
    Doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    }
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports=Chat;