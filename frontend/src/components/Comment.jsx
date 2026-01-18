import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";

const Comment = ({ comment, onLike }) => {
    let { authUser } = useAuthContext();

    return (
        <div className="flex my-4 gap-3 border-b-2 border-gray-200 p-3">
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
                    <p className="text-gray-600 wrap-break-word">
                        {comment.content}
                        FaThumbsUpFaThumbsUpFaThumbsUpFaThumbsUpFaThumbsUpFaThumbsUpFaThumbsUpFaThumbsUp
                        kawjhdagbwidvia ajwbd ugawh dg
                    </p>
                </div>
                <div className="border-t border-gray-400 w-fit mt-3">
                    <button
                        className={`flex gap-1 items-center text-sm cursor-pointer text-gray-500 hover:text-blue-500 ${authUser && comment.likes.includes(authUser._id) && "text-blue-500!"}`}
                        onClick={() => onLike(comment._id)}
                    >
                        <FaThumbsUp />
                        <span>{comment.numberOfLikes}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
