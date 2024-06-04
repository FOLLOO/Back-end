import express from "express";
import {
    createPost,
    getOne,
    getAll,
    deleteOne,
    updateOne,
    getUserPost,
    getAvtorPost, searchPosts
} from '../controllers/postController.js';
import {createLike, dislikeLike, getLikes, getLike, likeLike} from '../controllers/likeController.js';
import {createComment, deleteComment, updateComment, getComments, } from '../controllers/commentController.js';

import { postsCreateValidation } from "../validations/posts.js";
import validationErrors from "../utils/validationErrors.js";
import checkAuth from "../utils/checkAuth.js";


const router = express.Router();


router.get("/",checkAuth, getAll);
router.get('/search',checkAuth, searchPosts);

router.get("/me",checkAuth, getUserPost);
router.get("/avtor/:id",checkAuth, getAvtorPost);

//66362f026617594c6a1d0180
//66362f026617594c6a1d0180

router.get("/:id",checkAuth, getOne);

router.get('/:id/likes', getLikes); //todo! AFter ADD MB

router.get('/:id/liked',checkAuth, getLike);

router.get('/:id/comments', getComments);


router.delete("/:id",checkAuth, deleteOne);
router.delete("/:id/comments",checkAuth, deleteComment);


router.post('/:id/like', checkAuth, createLike);

router.post('/:id/comments',checkAuth, createComment);

router.post("/add",checkAuth, postsCreateValidation, validationErrors, createPost);

router.patch("/:id",checkAuth, postsCreateValidation, validationErrors, updateOne);

router.patch('/:id/dislike',checkAuth, dislikeLike);

router.patch('/:id/lilkelike',checkAuth, likeLike);
router.patch("/:id/comments",checkAuth, updateComment);




export default router;
