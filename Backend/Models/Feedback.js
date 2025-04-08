const mongoose =require("mongoose");



const Feedbacks=new mongoose.Schema({

    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        required: true,
    },
   
  
})
module.exports=mongoose.model("Feedbacks",Feedbacks);