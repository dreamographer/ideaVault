import express from 'express'
const app=express()
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
const port = process.env.PORT || 5000;
