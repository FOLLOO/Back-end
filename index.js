import express, {json} from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js'

import UserModel from './models/user.js'

import RoleRouter from './routes/role.js'
import UserRouter from './routes/user.js'



mongoose
    .connect('mongodb+srv://nafissafiullin2004:wwwwww@cluster0.sj3yp8e.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB is connected'))
    .catch((err) => console.log('DB NOT OK', err));


import {config} from "dotenv";

config();
const app = express();

app.use(express.json());

app.get('/', (req, res) =>  {
    res.send('Yeap it`s work!')
})

app.use('/role', RoleRouter);
app.use('/api', UserRouter);


app.listen(4000, (err) =>{
    if(err){
        console.log(err, "ERROR")
    }
    console.log('Server is running on port 4000')
});