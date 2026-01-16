import {
    Alert,
    Button,
    FileInput,
    Select,
    Spinner,
    TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const UpdatePost = () => {
    let { authUser } = useAuthContext();
    let { postId } = useParams();
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isPostPublishing, setIsPostPublishing] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [formData, setFormData] = useState({});
    const [errorFetchingPost, setErrorFetchingPost] = useState(false);

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    useEffect(() => {
        async function fetchData() {
            try {
                let res = await fetch(`/api/post/getposts?postId=${postId}`);
                let data = await res.json();
                if (!res.ok) return setErrorFetchingPost(true);
                if (res.ok) {
                    setFormData({
                        title: data.posts[0].title,
                        category: data.posts[0].category,
                        image: data.posts[0].image,
                        content: data.posts[0].content,
                    });
                    console.log(data.posts[0]);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [postId]);

    const handleUpload = async () => {
        if (!file) {
            return setError("Please select an image.");
        }

        if (file.type !== "image/png") {
            return setError("Only image/png files are allowed !");
        }
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

            //update imageURL in formadata
            setFormData((prev) => ({
                ...prev,
                image: data.url,
            }));
        } catch (error) {
            setError("Server Error while uploading image.");
        } finally {
            setIsImageUploading(false);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        if (!formData.content) {
            return setError("Fill in the required fields ( title & content ) ");
        }

        try {
            setIsPostPublishing(true);
            let res = await fetch(
                `/api/post/updatepost/${postId}/${authUser._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            let data = await res.json();

            if (data.error) {
                return setError("This Post title is already taken.");
            }
            console.log(data);
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setError("Error while updating the post.");
        } finally {
            setIsPostPublishing(false);
        }
    }

    return (
        <div className="min-h-screen max-w-3xl mx-auto p-2">
            {errorFetchingPost ? (
                <h1 className="text-center my-2">
                    Error while fetching the posts data or post doesnt exist.
                </h1>
            ) : (
                <>
                    <h1 className=" text-center my-4 text-2xl font-semibold">
                        Update post
                    </h1>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-between flex-col sm:flex-row gap-2">
                            <TextInput
                                placeholder="Title"
                                type="text"
                                id="title"
                                className="flex-1"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [e.target.id]: e.target.value,
                                    })
                                }
                                required
                                value={formData.title}
                            />

                            <Select
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        [e.target.id]: e.target.value,
                                    });
                                }}
                                id="category"
                                value={formData.category}
                            >
                                <option value="uncategorized">
                                    Select a category
                                </option>
                                <option value="javascript">JavaScript</option>
                                <option value="reactjs">React JS</option>
                                <option value="nodejs">Node JS</option>
                                <option value="nextjs">Next JS</option>
                            </Select>
                        </div>
                        <div className="flex p-3 border-3 border-teal-500 border-dotted rounded-xl gap-2">
                            <FileInput
                                type="file"
                                accept="image/*"
                                className="flex-1"
                                onChange={(e) => {
                                    setError(null);
                                    setFile(e.target.files[0]);
                                }}
                            />
                            <Button
                                type="button"
                                className={`cursor-pointer bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800  font-semibold`}
                                onClick={handleUpload}
                            >
                                {isImageUploading ? (
                                    <>
                                        <Spinner
                                            aria-label="Alternate spinner button example"
                                            size="sm"
                                        />
                                        <span className="pl-3">
                                            Uploading...
                                        </span>
                                    </>
                                ) : formData.image ? (
                                    "Uploaded"
                                ) : (
                                    "Upload Image"
                                )}
                            </Button>
                        </div>
                        {error && <Alert color="failure">{error}</Alert>}
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Image"
                                className="w-full h-72 object-cover"
                            />
                        )}
                        
                        <div className="flex flex-col mt-3">
                            <span className="text-gray-600 text-[10px] text-center">
                                (Write code inside &lt;code&gt; tag)
                            </span>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFormData({ ...formData, content: data });
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-[10px] text-center">
                                (Upload image before publishing your post)
                            </span>
                            <Button
                                type="submit"
                                className="w-full bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer font-semibold"
                            >
                                {isPostPublishing ? (
                                    <>
                                        <Spinner
                                            aria-label="Alternate spinner button example"
                                            size="sm"
                                        />
                                        <span className="pl-3">
                                            Updating...
                                        </span>
                                    </>
                                ) : (
                                    "Update Post"
                                )}
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default UpdatePost;
