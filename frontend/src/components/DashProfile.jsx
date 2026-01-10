import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const DashProfile = () => {
    const [formData, setFormData] = useState({
        username: null,
        email: null,
        password: null,
        profilePicture: null,
    });

    const { authUser, saveAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const filePickerRef = useRef();

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    async function handleSubmit(e) {
        setError(null);
        console.log("submit");
        e.preventDefault();
        if (Object.keys(formData).length === 0 && !imageFile) return;
        try {
            setLoading(true);

            const res = await fetch(`/api/user/update/${authUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data = await res.json();
            if (!res.ok) {
                return setError(data);
            }

            saveAuthUser(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
            <div className=" max-w-lg mx-auto">
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
                </form>
                <div className="text-red-500 flex justify-between mt-2">
                    <span className="cursor-pointer ">Delete Account</span>
                    <span className="cursor-pointer ">Sign Out</span>
                </div>
            </div>
        </div>
    );
};

export default DashProfile;
