const Feedbacks =require('../Models/Feedback.js')
exports.AddFeedback = async(req,res) => {
    try{
        const data = req.body;
        console.log(data);

        const newfeedback = await new Feedbacks(data)
        await newfeedback.save();
        
        res.status(200).send({status:true,msg:"Feedback added successfully"});
      

    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({status:false,msg:err.message});
    }

}

exports.getFeedbacks = async(req,res) => {
  try{
      
      Feedbacks.find()
        .then((result)=>{
            res.status(200).send({status:true,msg:"Feedbacks fetched successfully",data:result});
        })



  }
  catch(err)
  {
      console.log(err.message);
      res.status(500).send({status:false,msg:err.message});
  }

}