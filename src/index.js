import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
});



connectDB()


// import express from "express";
// const app = express();
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         app.on("error",(err) => {
//             console.error("Error in Express app:", err);
//             throw err
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is Listening on port ${process.env.PORT}`);
//         });

//         console.log("MongoDB connected successfully.");
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// })();
