import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

 const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('No file path provided for upload');
        }
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto', // Automatically detect the resource type
        });
        console.log('File uploaded successfully to Cloudinary',response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath); // Clean up the local file
        return null; // Return null if upload fails
    }  
} 

export {uploadOnCloudinary};    

    