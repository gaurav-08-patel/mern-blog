import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
    .connect(process.env.Mongo_DB_URI)
    .then(() => {
        console.log("Connected to MongoDB .");
    })
    .catch((err) => {
        console.log(err);
    });

import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import postRoute from './routes/post.routes.js'
import { upload } from "./hooks/uploadImg.js";

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Route for uploading image
app.post("/api/upload", upload.single("image"), (req, res) => {
    res.json({ url: req.file.path }); // Cloudinary URL
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} .`);
});
