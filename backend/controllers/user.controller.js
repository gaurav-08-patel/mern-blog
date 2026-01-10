import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json("You are not allowed to update this user");
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res
                .status(400)
                .json("Password must be at least 6 characters.");
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return res
                .status(400)
                .json("Username must be between 7 and 20 characters.");
        }
        if (req.body.username.includes(" ")) {
            return res.status(400).json("Username must not contain spaces.");
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return res.status(400).json("Username must be lowercase.");
        }
        if (!req.body.username.match(/^[A-Za-z0-9]+$/)) {
            return res
                .status(400)
                .json("Username can only contain letters and numbers.");
        }
    }
    try {
        const updateFields = {};
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.profilePicture)
            updateFields.profilePicture = req.body.profilePicture;
        if (req.body.password) updateFields.password = req.body.password;

        let updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: updateFields,
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.json(rest);
    } catch (error) {
        res.status(500).json("Username or email already taken.");
    }
};

export const deleteUser = async (req, res) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).json("You are not allowed to delete this user.");
    }

    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json("User deleted succcessfully.");
    } catch (error) {
        res.status(400).json(error.message);
    }
};
