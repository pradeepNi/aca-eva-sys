import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

usersSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.methods.matchPassword = async function (enterPass) {
    return await bcrypt.compare(enterPass, this.password);
}

const User = mongoose.model('User', usersSchema);
export default User;