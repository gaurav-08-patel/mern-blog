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
import { RxCross2 } from "react-icons/rx";
import { FcCheckmark } from "react-icons/fc";

const DashUsers = () => {
    const [showMore, setShowMore] = useState(true);
    let { authUser } = useAuthContext();
    const [users, setUsers] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState("");
    const [fetchingUsers, setFetchingUsers] = useState(false);

    async function handleDeletePost() {
        setOpenModal(false);

        try {
            let res = await fetch(
                `/api/post/deletepost/${postToDelete}/${authUser._id}`,
                {
                    method: "DELETE",
                }
            );
            if (res.ok) {
                setUsers((prev) =>
                    prev.filter((post) => post._id !== postToDelete)
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleShowMore() {
        let startIndex = users.length;
        try {
            let res = await fetch(
                `/api/user/getusers?startIndex=${startIndex}`
            );
            let data = await res.json();
            if (res.ok) {
                setUsers([...users, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                setFetchingUsers(true);
                let res = await fetch(`/api/user/getusers`);
                let data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setFetchingUsers(false);
            }
        }

        fetchUsers();
    }, [authUser._id]);

    return (
        <div className="p-2 table-auto  min-h-screen">
            {authUser.isAdmin && users.length > 0 ? (
                <>
                    <Table
                        hoverable
                        className="divide-y shadow rounded-2xl mx-auto max-w-4xl"
                    >
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="whitespace-nowrap">
                                    Date Created
                                </TableHeadCell>
                                <TableHeadCell className="whitespace-nowrap">
                                    user image
                                </TableHeadCell>
                                <TableHeadCell className="whitespace-nowrap">
                                    Username
                                </TableHeadCell>
                                <TableHeadCell>email</TableHeadCell>
                                <TableHeadCell>admin</TableHeadCell>
                                <TableHeadCell>delete</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        {new Date(
                                            user.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={user.profilePicture}
                                            alt={"avatar"}
                                            className=" h-12  object-cover w-12 rounded-full bg-teal-100 overflow-hidden"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            {user.username}
                                        </span>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.isAdmin ? (
                                            <FcCheckmark className="text-xl" />
                                        ) : (
                                            <RxCross2 className="text-red-500 text-xl" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className="text-red-500 hover:underline font-semibold cursor-pointer"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setPostToDelete(user._id);
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
            ) : fetchingUsers ? (
                <div className="text-center my-3">
                    <Spinner
                        aria-label="Alternate spinner button example"
                        size="sm"
                    />
                    <span className="pl-3">Loading Users...</span>
                </div>
            ) : (
                <p className="text-center my-3">
                    You are not authorized to see all the User's details.
                </p>
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
                            Are you sure you want to delete this post?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="red"
                                onClick={() => handleDeletePost()}
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

export default DashUsers;
