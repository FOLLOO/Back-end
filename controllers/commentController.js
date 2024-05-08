import CommentModule from '../models/comments.js';


export const createComment = async (req, res) => {

    const {user_id , text} = req.body;
    const post_id = req.params.id
    try{

        const comment = await CommentModule.create({user_id , post_id, comment: text})
        const dbSave = await comment.save();

        res.status(201).json({success: true});
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('Error cannot add comment to post', err)
    }
}

export const deleteComment = async (req, res) => {

    const {user_id} = req.body;
    const post_id = req.params.id;

    try{
        const comment = await CommentModule.deleteOne({
            $and: [
                { user_id },
                { post_id }
            ]
        });

        res.status(200)
            .json({success: true});
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('Error cannot delete comment', err)
    }
}

export const updateComment = async (req, res) => {

    const {user_id, text} = req.body;
    const post_id = req.params.id;

    try{
        const adlike = await CommentModule.updateOne({
            $and: [
                { user_id },
                { post_id }
            ]
        }, {comment: text});

        res.status(200)
            .json(adlike);
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('Error cannot update comment', err)
    }
}

export const getComments = async (req, res) => {

    const post_id = req.params.id;

    try{
        const commetns = await CommentModule.find({ post_id : post_id });

        res.status(200)
            .json(commetns);
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('Error cannot dislike the post', err)
    }
}