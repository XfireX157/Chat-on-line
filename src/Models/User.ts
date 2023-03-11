import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from "../Types/User";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    }
}, {collection: 'users'})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.checkPassWord = function(password: string) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.genereteToken = function({id, email}: IUser) {
    return jwt.sign({id, email}, 'Segredo', {expiresIn: 86400})
}

const User = mongoose.model('users', userSchema)

export default User