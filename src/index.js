import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})






// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import connectDB from "./db/index.js";
// import express from "express";
// import {app} from './app.js'
// const app = express();


// dotenv.config({
//     path:'./.env'
// });



// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000,()=>{
//         console.log(`Server is Listening on port ${process.env.PORT || 8000}`);
//     })
// })
// .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//     process.exit(1); // Exit the process with failure
// });



// // import express from "express";
// // const app = express();
// // (async () => {
// //     try {
// //         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
// //         app.on("error",(err) => {
// //             console.error("Error in Express app:", err);
// //             throw err
// //         })
// //         app.listen(process.env.PORT, () => {
// //             console.log(`App is Listening on port ${process.env.PORT}`);
// //         });

// //         console.log("MongoDB connected successfully.");
// //     } catch (err) {
// //         console.error("Error connecting to MongoDB:", err);
// //     }
// // })();
