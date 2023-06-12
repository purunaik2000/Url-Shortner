require('dotenv').config({path: __dirname+'/../.env'});
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://localhost:27017/database")
// .then(()=>console.log("Connected to database."))
// .catch((err)=>console.log(err));
mongoose.connect(process.env.DAATABASE_CONNECTION_STRING)
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log(err.message));

const route = require("./route/route");
app.use('/',route);

app.listen(process.env.PORT,(err)=>{
    if(err) return console.log(err.message);
    console.log("Application is running");
});

