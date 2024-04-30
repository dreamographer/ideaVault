import express from 'express'
import ideaRouter from './routes/ideaRoutes.js'
import { connectToDatabase } from './db.js';
import authRouter from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import passport from 'passport';
const app=express()
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize()); 
const port = process.env.PORT || 5000;
connectToDatabase().then(()=>{
    app.use("/auth",authRouter)
    app.use("/api/idea",ideaRouter)
    app.listen(port,()=>console.log(`server running on port ${port}`))
})