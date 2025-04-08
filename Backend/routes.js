const express=require('express');

const router=express.Router();


const {AddFeedback,getFeedbacks} =require('./Controllers/Feedback.js');

//http://localhost:5000/Fallon/addFeedback
router.post('/addFeedback',AddFeedback);


//http://localhost:5000/Fallon/getFeedbacks
router.get('/getFeedbacks',getFeedbacks);




module.exports=router