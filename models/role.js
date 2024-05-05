import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
        title: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    });


export default mongoose.model('Role', RoleSchema);