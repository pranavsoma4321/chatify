import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateToken } from '../../lib/utils.js';
import express from 'express';
import dotenv from 'dotenv';
import { sendwelcomeEmail } from '../emails/emailHandler.js';
import cloudinary from "../../lib/cloudinary.js"

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// signup controller
export const signup = async (req, res) => {
    const { username, email, password,} = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // check valid email with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        // Check if user already exists by email or username
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already exists" });
            } else {
                return res.status(400).json({ message: "Username already taken" });
            }
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                message: "User created successfully"
            });

            // todo: send welcome email here

            try{
                await sendwelcomeEmail(savedUser.email, savedUser.fullname, process.env.CLIENT_URL);
            } catch (error) {
                console.error("Error sending welcome email:", error);
            }

        } else {
            return res.status(400).json({ message: "Error creating user" });
        }

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Error in signup", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
            message: "Login successful"
        });
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Error in login", error: error.message });
    }
}

export const logout = async (_, res) =>  {
    res.cookie("jwt", "", {maxAge: 1})
    res.status(200).json({message: "Logged out successfully"});
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId; // or get from auth middleware
    let profilePicUrl;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: 'chat-app-profiles', resource_type: 'auto' },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      profilePicUrl = result.secure_url;
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        ...req.body, // name, email, etc.
        ...(profilePicUrl && { profilePic: profilePicUrl })
      },
      { new: true }
    );

    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};







