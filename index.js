import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from './Database/Database.js';
import { signup } from './Routes/Signup.js';
// import { User } from './Models/Users.js';
import cors from 'cors';
import { Login } from './Routes/Login.js';
import { Dashboard } from './Routes/Dashboard.js';
import { isSignIn } from './Authorization/Authorization.js';
import {  Restaurants } from './Routes/Restaurants.js';
import { Forgotpassword } from './Routes/Forgotpass.js';

dotenv.config();
const app = express();
 const PORT = process.env.port

app.listen(5000, (req, res)=>{
    console.log(`Sever listening on ${PORT}`)
    
})
createConnection();
//middlewares
app.use(express.json());
app.use(cors());
app.use('/', signup )
app.use('/', Login)
app.use('/home',isSignIn, Dashboard)
app.use('/home',isSignIn, Restaurants)
app.use('/', Forgotpassword)

app.get('/', (req, res)=>{
    res.status(200).json(`Hey Your Server is listening on ${PORT}`)
})

