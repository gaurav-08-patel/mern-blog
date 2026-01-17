import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Alert, Button, Spinner, Textarea } from "flowbite-react";
import { useState } from "react";

const CommentSection = ({ postId }) => {
    let { authUser } = useAuthContext();
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (comment.length === 0) return;

        try {
            setLoading(true);
            let res = await fetch(`/api/comment/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: comment,
                    postId: postId,
                    userId: authUser._id,
                }),
            });

            let data = await res.json();
            if (res.ok) {
                setComment("");
                setCommentError(null);
            }
        } catch (error) {
            setCommentError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto w-full my-4">
            {authUser ? (
                <div className="flex items-center gap-1">
                    <p className="text-slate-500">Signed in as:</p>
                    <Link
                        to={"/dashboard?tab=profile"}
                        className="flex items-center gap-1 text-teal-500"
                    >
                        <img
                            src={authUser.profilePicture}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="hover:underline">
                            @{authUser.username}
                        </span>
                    </Link>
                </div>
            ) : (
                <div className="flex gap-2 text-sm text-slate-500">
                    <p>Sign in to comment:</p>
                    <Link
                        to={"/signin"}
                        className="hover:underline text-teal-500"
                    >
                        Sign In
                    </Link>
                </div>
            )}

            <form
                className="mt-4 p-3 border border-teal-500 rounded"
                onSubmit={handleSubmit}
            >
                <Textarea
                    placeholder="Add a comment..."
                    maxLength={200}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-slate-500">
                        {200 - comment.length} characters remaining
                    </span>
                    <Button
                        type="submit"
                        className={`cursor-pointer bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800  font-semibold flex gap-1 justify-center items-center`}
                        size="sm"
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    size="sm"
                                    className="flex justify-center"
                                />{" "}
                                <span>Submitting...</span>
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </div>
                {commentError && (
                    <Alert color="failure" className="mt-5">
                        {commentError}
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default CommentSection;
