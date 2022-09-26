const mongoose=require("mongoose");
const noteSchmea=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    filename:{
        type:String,
        required:true,
    },type:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
});
 const Note=mongoose.model("Note",noteSchmea);

 module.exports=Note;