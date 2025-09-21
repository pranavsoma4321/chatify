// we need to know the user already exists or not so we need to create these user file

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true }); // created at and updated at

const User = mongoose.model("User", userSchema);

export default User;
