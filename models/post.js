import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        banned: {
            type: Boolean,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    });


export default mongoose.model('Post', PostSchema);