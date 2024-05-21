import express from "express";
import {createPost, getOne, getAll, deleteOne, updateOne, getUserPost} from '../controllers/postController.js';
import {createLike, dislikeLike, getLikes, getLike} from '../controllers/likeController.js';
import {createComment, deleteComment, updateComment, getComments, } from '../controllers/commentController.js';

import { postsCreateValidation } from "../validations/posts.js";
import validationErrors from "../utils/validationErrors.js";
import checkAuth from "../utils/checkAuth.js";


const router = express.Router();


router.get("/",checkAuth, getAll);

router.get("/avtor/:id",checkAuth, getUserPost);

router.get("/:id",checkAuth, getOne);

router.get('/:id/likes', getLikes);

router.get('/:id/liked',checkAuth, getLike);

router.get('/:id/comments', getComments);


router.delete("/:id",checkAuth, deleteOne);
router.delete("/:id/comments",checkAuth, deleteComment);


router.post('/:id/like',checkAuth, createLike);
router.post('/:id/comments',checkAuth, createComment);

router.post("/add",checkAuth, postsCreateValidation, validationErrors, createPost);

router.patch("/:id",checkAuth, postsCreateValidation, validationErrors, updateOne);

router.patch('/:id/dislike',checkAuth, dislikeLike);
router.patch("/:id/comments",checkAuth, updateComment);




export default router;
