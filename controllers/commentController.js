import CommentModule from '../models/comments.js';


export const createComment = async (req, res) => {

    const {text} = req.body;
    const user_id = req.userId.id;
    const post_id = req.params.id

    if (!user_id || !post_id){
        return res.status(404).json('User of Post not found');
    }

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

    // const {user_id} = req.body;
    // const user_id = req.userId.id;
    // const post_id = req.params.id;
    const comment_id = req.params.id;
    if (!comment_id){
        return res.status(404).json('User of Post not found');
    }
    // if (!user_id || !post_id){
    //     return res.status(404).json('User of Post not found');
    // }

    try{
        const comment = await CommentModule.deleteOne(
                { _id: comment_id }
        );

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

    const {text} = req.body;
    const user_id = req.userId.id
    const post_id = req.params.id;

    if (!user_id || !post_id){
        return res.status(404).json('User of Post not found');
    }

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

    if  (!post_id){
        return res.status(404).json(' Post not found');
    }

    try{
        const commetns = await CommentModule.find({ post_id : post_id }).populate('user_id', 'nickname');

        res.status(200)
            .json(commetns);
    }
    catch(err){
        console.log(err);
        res.status(500)
            .json('Error cannot dislike the post', err)
    }
}