import express from 'express';
import cors from'cors';
import 'dotenv/config';
import {connectDB} from './config/db.js';
import userRoute from './routes/userRoute.js';
import incomeRoute from "./routes/incomeRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import dotenv from "dotenv";
dotenv.config();


const app=express();
const PORT= process.env.PORT || 4000;


//Middlewaare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//DB
await connectDB();

//Routes
app.use("/api/user",userRoute);
app.use("/api/income", incomeRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/dashboard", dashboardRoute);


app.get('/',(req,res)=>{
    res.send("Hello from backend");
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})