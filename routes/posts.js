import express from "express";
import {createPost, getOne, getAll, deleteOne, updateOne} from '../controllers/postController.js';

import { postsCreateValidation } from "../validations/posts.js";
import validationErrors from "../utils/validationErrors.js";


const router = express.Router();


router.get("/", getAll);
router.get("/:id", getOne);

router.delete("/:id", deleteOne);

router.post("/add",postsCreateValidation, validationErrors, createPost);
router.patch("/:id",postsCreateValidation, validationErrors, updateOne);

export default router;
