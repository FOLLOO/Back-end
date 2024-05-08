import mongoose from 'mongoose'

const UserBuyContent = new mongoose.Schema({
        buyer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        buy_period: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    });


export default mongoose.model('UserBuyContent', UserBuyContent);