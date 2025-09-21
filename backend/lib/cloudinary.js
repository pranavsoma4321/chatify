import dotenv from 'dotenv';
dotenv.config();  // MUST run first

import { v2 as cloudinary } from 'cloudinary';
import { ENV } from './env.js';


cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
    secure: true
});

console.log("Cloudinary config:", process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY, !!process.env.CLOUDINARY_API_SECRET);

export default cloudinary;