import moment from "moment";

const Comment = ({ comment }) => {
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
            <div className="">
                <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm">
                        @{comment.userId?.username || "anonymous"}
                    </p>
                    <span className="text-slate-500 text-sm">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                <p className="text-gray-600">
                    {comment.content}
                </p>
            </div>
        </div>
    );
};

export default Comment;
