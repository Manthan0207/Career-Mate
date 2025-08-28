import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
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
            required: true
        },
        lastLogin: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true })

export const User = mongoose.Model('User', userSchema)