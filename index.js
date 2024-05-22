import express, {json} from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'

import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js'

import UserModel from './models/user.js'

import RoleRouter from './routes/role.js'
import UserRouter from './routes/user.js'
import PostRouter from './routes/posts.js'
import UserBuyRouter from './routes/userBuy.js'



mongoose
    .connect('mongodb+srv://nafissafiullin2004:wwwwww@cluster0.sj3yp8e.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB is connected'))
    .catch((err) => console.log('DB NOT OK', err));


import {config} from "dotenv";
import checkAuth from "./utils/checkAuth.js";

config();
const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, './uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: 'http://localhost:3000' // Разрешить запросы с этого источника
}));

app.get('/', (req, res) =>  {
    res.send('Yeap it`s work!')
})

app.use('/role', RoleRouter);
app.use('/api', UserRouter);
app.use('/posts', PostRouter);
app.use('/buy', UserBuyRouter);

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})



app.listen(4000, (err) =>{
    if(err){
        console.log(err, "ERROR")
    }
    console.log('Server is running on port 4000')
});