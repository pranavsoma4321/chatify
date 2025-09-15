import { V2 as cloudinary } from 'cloudinary';    
import { ENV } from './env.js';
import cloudinary from './cloudinary';

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
    secure: true
});

export default cloudinary;