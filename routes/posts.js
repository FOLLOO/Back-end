import express from "express";
import {createPost, getOne, getAll, deleteOne, updateOne} from '../controllers/postController.js';
import {createLike, dislikeLike, getLikes, getLike} from '../controllers/likeController.js';
import {createComment, deleteComment, updateComment, getComments} from '../controllers/commentController.js';

import { postsCreateValidation } from "../validations/posts.js";
import validationErrors from "../utils/validationErrors.js";


const router = express.Router();


router.get("/", getAll);
router.get("/:id", getOne);

router.get('/:id/likes', getLikes);

router.get('/:id/liked', getLike);

router.get('/:id/comments', getComments);


router.delete("/:id", deleteOne);
router.delete("/:id/comments", deleteComment);


router.post('/:id/like', createLike);
router.post('/:id/comments', createComment);

router.post("/add",postsCreateValidation, validationErrors, createPost);

router.patch("/:id",postsCreateValidation, validationErrors, updateOne);

router.patch('/:id/dislike', dislikeLike);
router.patch("/:id/comments", updateComment);




export default router;
