import express from 'express'
import ideaRouter from './routes/ideaRoutes.js'
import { connectToDatabase } from './db.js';
import authRouter from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import passport from './config/auth.js'
import session from "express-session";
import cors from "cors";
const SESSION = process.env.SESSION_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const app=express()
app.use(
  session({
    secret: `${SESSION}`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: `${CLIENT_URL}`,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${CLIENT_URL}`); 
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize()); 
app.use(passport.session());
const port = process.env.PORT || 5000;
connectToDatabase().then(()=>{
    app.use("/auth",authRouter)
    app.use("/api/idea",ideaRouter)
    app.listen(port,()=>console.log(`server running on port ${port}`))
})