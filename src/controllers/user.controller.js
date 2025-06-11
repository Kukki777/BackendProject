import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    //validate user details
    //check if user already exists
    //check for images,check for avatar
    //upload them to cloudinary,avatar
    //create usrr object -create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    const{fullName,email,username,password}=req.body 
    console.log("email",email);

    if(
        [fullName,email,username,password].some((field) => field?.trim() === "")
        ){
        throw new ApiError(400, "All fields are required");
    }
    
    const existedUser=User.findOne({$or :[{email},{username}]
    })

    if(existedUser){
        throw new ApiError(400, "User already exists with this email or username");
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatarv file is required");
    }
    const avatar=await uploadOnCloudinary(avatarLocalPath) 
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }

    const user=await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avtar: avatar.url,
        coverImage: coverImage?.url || "",
    }).then((user) => {
        user.password = undefined;
        user.refreshToken = undefined;
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    }).catch((error) => {
        throw new ApiError(500, "User registration failed", error);
    });

    const createduser=await User.findById(user._id).select("-password -refreshToken");

    if(!createduser){
        throw new ApiError(500, "User registration failed");
    }
    return res.status(201).json(
        new ApiResponse(200,createduser,"User registered successfully" )
)

})

export {registerUser};