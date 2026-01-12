import Post from "../models/post.model.js";

export const create = async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json({
            message: "You are not allowed to create post.",
        });
    }

    if (!req.body.title || !req.body.content) {
        res.status(400).json({ message: "All fields are required." });
    }

    let slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        let savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ error: "Duplicate Key" });
    }
};
