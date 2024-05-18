import express from 'express';

const router = express.Router();

import {createUserBuy, getUserSubes} from '../controllers/userBuyContentController.js';
import checkAuth from "../utils/checkAuth.js";

router.get('/all',checkAuth, getUserSubes);

router.post('/add',checkAuth, createUserBuy);

export default router;