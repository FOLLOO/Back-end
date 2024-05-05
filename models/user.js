import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
        nickname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: {
                validator: async function (email) {
                    const user = await this.constructor.findOne({ email });
                    return !user;
                },
                message: 'Email is already taken',
            },
        },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        },
        cost: {
            type: String,
            required: false,
        },
        descriptions: {
            type: String,
            required: false,
        },
        passwordHash: {
            type: String,
            require: true,
        },
        avatarURL: String,
    },
    {
        timestamps: true,
    });


export default mongoose.model('User', UserSchema);