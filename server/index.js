import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import textRouter from "./router/text.js";

dotenv.config({path:'./config.env'});

const app=express();

app.use(bodyParser.json({limit:"30mb",extended:"true"}));
app.use(cors());

app.use('/text',textRouter);

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server Running on ${PORT}`)))
    .catch((err)=>console.log(err));