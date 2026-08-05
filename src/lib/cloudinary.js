// src\lib\cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Helper Function: Image Upload with Exact Overwrite in Cloudinary
 */
export const uploadImageToCloudinary = async (fileBuffer, folder = 'taranggoa/profiles', publicId = null) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto',
      overwrite: true,          
      unique_filename: false,   
      invalidate: true,         
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(fileBuffer);
  });
};

export const getOptimizedImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  });
};

export default cloudinary;