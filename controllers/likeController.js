import likeModule from '../models/like.js';
import checkAuth from "../utils/checkAuth.js";


export const createLike = async (req, res) => {

    // const {user_id} = req.body;
    const user_id = req.userId.id
    const post_id = req.params.id

    if (!user_id || !post_id){
        return res.status(404).json('User of Post not found');
    }

    try{
        const existingLike = await likeModule.findOne({ user_id, post_id }); // Проверка, есть ли уже лайк от этого пользователя на этот пост

        if (existingLike) {
            return res.status(400).json({ error: 'You have already liked this post' });
        }

        const adlike = await likeModule.create({user_id , post_id: post_id, like : true})
            const dbSave = await adlike.save();
        res.status(201).json({success: true});
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('----Error cannot add like to post', err)
    }
}

export const dislikeLike = async (req, res) => {

    // const {user_id} = req.body;
    const user_id = req.userId.id
    const post_id = req.params.id;

    if (!user_id || !post_id){
        return res.status(404).json('User of Post not found');
    }
    try{
        const adlike = await likeModule.updateOne({
            $and: [
                { user_id },
                { post_id }
            ]
        }, {like : false});

        res.status(200)
            .json({success: true});
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('---Error cannot dislike the post', err)
    }
}


export const getLikes = async (req, res) => {

    const post_id = req.params.id;

    if (!post_id){
        return res.status(404).json(' Post not found');
    }
    try{
        const likesCount = await likeModule.countDocuments({ post_id, like: true });
        res.status(200).json({ success: true, likesCount });
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('----Error cannot foundLikes the post', err)
    }
}

export const getLike = async (req, res) => {

    // const {user_id } = req.body;
    const user_id = req.userId.id
    const post_id = req.params.id;
    if (!user_id || !post_id){
        return res.status(404).json('User of Post not found');
    }
    try{
        const likeFound = await likeModule.findOne({
            $and: [
            { user_id: user_id },
            { post_id: post_id }
            ]
        });
        res.status(200).json(likeFound.like);
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('----Error cannot foundLikes the post', err)
    }
}