// pages/api/cloudinary.js

// import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

// Initialize Cloudinary with your cloud name and API key
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default cloudinaryUpload = async (req, res) => {
  try {
    const signature = cloudinary.utils.api_sign_request(
      req.body,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    );

    res.status(200).json({ signature });
  } catch (error) {
    res.status(500).json({ error: 'Error generating signature' });
  }
};
