import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default:
                "https://cdn.prod.website-files.com/62bec2ad58883c0d7237610e/634e8f7caf4208e1d3243248_blog-p-1080.png",
        },
        slug: {
            type: String,
            required:true,
            unique: true,
        },
        category: {
            type: String,
            default: "uncategorized",
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
