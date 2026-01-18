import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ comment, onLike, edit, deleteComment }) => {
    let { authUser } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    async function handleSave() {
        setIsEditing(false);
        try {
            let res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: editedContent }),
            });

            if (res.ok) {
                let data = await res.json();
                edit(comment._id, data.content);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex my-4 gap-3 border-b-2 border-gray-200 dark:border-slate-800 p-3">
            <div className=" shrink-0">
                <img
                    src={
                        comment.userId?.profilePicture ||
                        "https://static.vecteezy.com/system/resources/thumbnails/032/176/191/small/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
                    }
                    alt={comment.userId?.username}
                    className="h-10 w-10 object-cover rounded-full bg-slate-400"
                />
            </div>
            <div className="flex-1 w-9/10">
                <div>
                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm">
                            @{comment.userId?.username || "anonymous"}
                        </p>
                        <span className="text-slate-500 text-sm">
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                    {!isEditing && (
                        <p className="text-gray-600 wrap-break-word dark:text-[#838181]">
                            {comment.content}
                        </p>
                    )}
                </div>
                {isEditing ? (
                    <div className="mt-2 flex flex-col gap-3">
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="ml-auto flex gap-2">
                            <Button
                                color={"purple"}
                                className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl focus:ring-green-200 cursor-pointer"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => setIsEditing(false)}
                                color={"red"}
                                outline
                                className="bg-red-300 cursor-pointer"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="border-t border-gray-400 max-w-fit mt-3  text-xs text-gray-500 flex items-center gap-3 pt-1">
                        <button
                            className={`flex gap-1 items-center cursor-pointer hover:text-blue-500 ${authUser && comment.likes.includes(authUser._id) && "text-blue-500!"}`}
                            onClick={() => onLike(comment._id)}
                        >
                            <FaThumbsUp />
                            <span>{comment.numberOfLikes}</span>
                        </button>
                        {authUser &&
                            (authUser.id === comment.userId ||
                                authUser.isAdmin) && (
                                <button
                                    className="hover:text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            )}
                        {authUser &&
                            (authUser.id === comment.userId ||
                                authUser.isAdmin) && (
                                <button
                                    className=" cursor-pointer hover:underline text-red-500"
                                    onClick={() => deleteComment(comment._id)}
                                >
                                    Delete
                                </button>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
