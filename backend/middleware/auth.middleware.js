import jwt from 'jsonwebtoken';
import User from '../src/models/User.js';
import dotenv from 'dotenv';



export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized, please login"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message: "Unauthorized, Invalid token"})

        const user = await User.findById(decoded.id).select('-password');
        if(!user) return res.status(401).json({message: "Unauthorized, user not found"});

        req.user = user; // attaching user to req object

        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}