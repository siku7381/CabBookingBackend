import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import userRoutes from './src/routes/user.js';
import driverRoutes from './src/routes/driver.js';

const app = express();


app.use(bodyParser.json({ limit : "30mb", extended : true }));
app.use(bodyParser.urlencoded({ limit : "30mb" , extended : true }));

app.use('/user',userRoutes);
app.use('/driver',driverRoutes);



const CONNECTION_URL = 'mongodb+srv://dooshra:dooshra123@cluster0.fjwb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() =>{
        app.listen(PORT,() =>{
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) =>{
        console.log(err.message);
    });



    // mongoose.set('useFindAndModify',false);