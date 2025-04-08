const mongoose = require('mongoose');   

const MongooDB=()=>{
    try{
    mongoose.connect(process.env.MONGODB)
        .then(()=>{console.log("MongoDb connected.")});
    
    }
    catch(err){
        console.log(err);
    }
}
module.exports = MongooDB;