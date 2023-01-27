import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app=express();

app.use(bodyParser.json({limit:"30mb",extended:"true"}));

app.use(cors());

const CONNECTION_URL ="mongodb+srv://AswanthAchu:pnk2023@cluster0.ocvutgm.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server Running on ${PORT}`)))
    .catch((err)=>console.log(err));