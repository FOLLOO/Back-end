import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({

        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comment: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    });


export default mongoose.model('Comment', CommentSchema);