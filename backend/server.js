import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());

mongoose
    .connect(process.env.Mongo_DB_URI)
    .then(() => {
        console.log("Connected to MongoDB .");
    })
    .catch((err) => {
        console.log(err);
    });

import userRoute from "./routes/auth.routes.js";

app.use("/api/auth", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} .`);
});
