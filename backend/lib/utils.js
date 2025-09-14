import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (id, res) => {
    const token = jwt.sign({ id }, ENV.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent excessive attacks cross site scripting
        secure: process.env.NODE_ENV === 'development' ? false : true, // set to true in production
        sameSite: 'strict' // CSRF attack
    })

    return token;
};