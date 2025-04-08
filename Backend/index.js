const express= require('express');
const app= express();

app.use(express.json());//body parsing
const cors=require('cors');

app.use(cors(
    {
        origin:"*",
    }
));

require('dotenv').config()


const router=require('./routes.js');
app.use('/Fallon',router);

const MongooDB=require("./Configurations/mongoDb.js")
MongooDB();




app.listen(5000,()=>{console.log(`listening on port::${5000}....`)});