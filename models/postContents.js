import mongoose from 'mongoose'

const PostContentSchema = new mongoose.Schema({
        text_content: {
            type: String,
            require: false,
        },
        video_url: {
            type: String,
            require: false,
        },
        image: {
            type: String,
            require: false,
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true,
    });


export default mongoose.model('PostContent', PostContentSchema);