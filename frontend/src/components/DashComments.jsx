import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashComments = () => {
    const [showMore, setShowMore] = useState(true);
    let { authUser } = useAuthContext();
    const [comments, setComments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState("");
    const [fetchingComment, setFetchingComment] = useState(false);

    async function handleDeleteComment() {
        setOpenModal(false);

        try {
            let res = await fetch(
                `/api/comment/deleteComment/${commentToDelete}`,
                {
                    method: "DELETE",
                },
            );
            if (res.ok) {
                setComments((prev) =>
                    prev.filter((c) => c._id !== commentToDelete),
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleShowMore() {
        let startIndex = comments.length;
        try {
            let res = await fetch(
                `/api/comment/getComments?startIndex=${startIndex}`,
            );
            let data = await res.json();
            if (res.ok) {
                setComments([...comments, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchingComment() {
            try {
                setFetchingComment(true);
                let res = await fetch(`/api/comment/getComments`);
                let data = await res.json();

                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setFetchingComment(false);
            }
        }

        fetchingComment();
    }, [authUser._id]);

    return (
        <div className="p-2 table-auto  min-h-screen">
            {authUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className="divide-y shadow rounded-2xl">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="whitespace-nowrap">
                                    Date Updated
                                </TableHeadCell>
                                <TableHeadCell className="whitespace-nowrap">
                                    Comment content
                                </TableHeadCell>
                                <TableHeadCell className="whitespace-nowrap">
                                    number of likes
                                </TableHeadCell>
                                <TableHeadCell>postid</TableHeadCell>
                                <TableHeadCell>userid</TableHeadCell>
                                <TableHeadCell>delete</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map((comment) => (
                                <TableRow key={comment._id}>
                                    <TableCell>
                                        {new Date(
                                            comment.updatedAt,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold">
                                            {comment.content}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <span className="font-semibold">
                                            {comment.numberOfLikes}
                                        </span>
                                    </TableCell>
                                    <TableCell>{comment.postId}</TableCell>
                                    <TableCell>{comment.userId}</TableCell>
                                    <TableCell>
                                        <span
                                            className="text-red-500 hover:underline font-semibold cursor-pointer"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setCommentToDelete(comment._id);
                                            }}
                                        >
                                            Delete
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="text-teal-500 w-full cursor-pointer my-2"
                        >
                            Show more
                        </button>
                    )}
                </>
            ) : fetchingComment ? (
                <div className="text-center my-3">
                    <Spinner
                        aria-label="Alternate spinner button example"
                        size="sm"
                    />
                    <span className="pl-3">Loading Comments...</span>
                </div>
            ) : (
                <p className="text-center my-3">You have no comments</p>
            )}
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="red"
                                onClick={() => handleDeleteComment()}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color="alternative"
                                onClick={() => setOpenModal(false)}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default DashComments;
