import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Spinner,
    TextInput,
} from "flowbite-react";
import { useAuthContext } from "../context/AuthContext";
import { useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashProfile = () => {
    const [formData, setFormData] = useState({
        username: null,
        email: null,
        password: null,
        profilePicture: null,
    });

    const { authUser, saveAuthUser, deleteAuthUser } = useAuthContext();
    const [openModal, setOpenModal] = useState(false);
    const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const filePickerRef = useRef();

    async function handleDeleteUser() {
        setOpenModal(false);
        try {
            let res = await fetch(`api/user/delete/${authUser._id}`, {
                method: "DELETE",
            });

            let data = await res.json();
            if (!res.ok) {
                return setError(data);
            }

            //remove User-info from localStorage
            deleteAuthUser();
        } catch (error) {
            setError("Error while deleting the account.");
        }
    }

    function handleSignOut() {
        deleteAuthUser();
    }

    async function handleSubmit(e) {
        setError(null);
        e.preventDefault();
        if (Object.keys(formData).length === 0 && !imageFile) return;
        console.log("submit");
        try {
            setLoading(true);

            const res = await fetch(`/api/user/update/${authUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data = await res.json();
            if (!res.ok) {
                setUserUpdateSuccess(null);
                return setError(data);
            }

            saveAuthUser(data);
            setUserUpdateSuccess("User updated Successfully .");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setFormData({});
            setImageFile(null);
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    function handleImage(e) {
        setError(null);
        const file = e.target.files[0];
        if (file.type !== "image/png") {
            return setError("Only image/png files are allowed !");
        }

        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
            handleUpload(file);
        }
    }

    const handleUpload = async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);

        try {
            setIsImageUploading(true);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                throw Error("Internal Server Error .");
            }
            setImageUrl(data.url);
            //update imageURL in formadata
            setFormData((prev) => ({
                ...prev,
                profilePicture: data.url,
            }));
        } catch (error) {
            setError("Internal Server Error");
        } finally {
            setIsImageUploading(false);
        }
    };

    return (
        <div className=" w-full">
            <div className=" max-w-lg mx-auto p-2">
                <h1 className="text-center font-semibold text-3xl my-6">
                    Profile
                </h1>
                <form
                    className="flex flex-col items-center mt-4 gap-4"
                    onSubmit={handleSubmit}
                >
                    <div
                        onClick={() => {
                            filePickerRef.current.click();
                        }}
                        className="h-32 w-32 rounded-full border-5 border-[lightgray] shadow-xl self-center overflow-hidden"
                    >
                        <input
                            type="file"
                            onChange={handleImage}
                            accept="image/*"
                            ref={filePickerRef}
                            hidden
                        />
                        <img
                            src={imageUrl || authUser.profilePicture}
                            alt="Profile picture"
                            className="w-full h-full rounded-full cursor-pointer object-cover"
                        />
                    </div>
                    {error && (
                        <Alert
                            color="failure"
                            className="w-full flex items-center"
                        >
                            {error}
                        </Alert>
                    )}
                    <TextInput
                        className="w-full"
                        type="text"
                        placeholder="Username"
                        id="username"
                        defaultValue={authUser.username}
                        onChange={handleChange}
                    />
                    <TextInput
                        className="w-full"
                        type="email"
                        placeholder="Email"
                        id="email"
                        defaultValue={authUser.email}
                        onChange={handleChange}
                    />
                    <TextInput
                        className="w-full"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer font-semibold"
                        disabled={isImageUploading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    aria-label="Alternate spinner button example"
                                    size="sm"
                                />
                                <span className="pl-3">Updating...</span>
                            </>
                        ) : (
                            "Update"
                        )}
                    </Button>
                    {authUser.isAdmin && (
                        <Link to={"/createpost"} className="w-full">
                            <Button
                                type="button"
                                className="w-full bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer font-semibold"
                            >
                                Create Post
                            </Button>
                        </Link>
                    )}
                </form>
                <div className="text-red-500 flex justify-between mt-2">
                    <span
                        className="cursor-pointer "
                        onClick={() => setOpenModal(true)}
                    >
                        Delete Account
                    </span>
                    <span
                        className="cursor-pointer "
                        onClick={() => handleSignOut()}
                    >
                        Sign Out
                    </span>
                </div>
                {userUpdateSuccess && (
                    <Alert color="success" className="my-2">
                        {userUpdateSuccess}
                    </Alert>
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
                                Are you sure you want to delete this account?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="red"
                                    onClick={() => handleDeleteUser()}
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
        </div>
    );
};

export default DashProfile;
