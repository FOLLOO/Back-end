import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema({

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
        like: {
            type: Boolean,
            required: false,
        },
    },
    {
        timestamps: true,
    });


export default mongoose.model('Like', LikeSchema);