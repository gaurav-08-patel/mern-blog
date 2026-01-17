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
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isPostPublishing, setIsPostPublishing] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleUpload = async () => {
        setError(null);

        if (!file) {
            return setError("Please select an image.");
        }

        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            return setError("Only png/jpeg files are allowed !");
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
        if (!formData.title || !formData.content) {
            return setError("Fill in the required fields ( title & content ) ");
        }

        try {
            setIsPostPublishing(true);
            let res = await fetch("/api/post/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data = await res.json();

            if (data.error) {
                return setError("This Post title is already taken.");
            }
            console.log(data);
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setError("Error while publishing post.");
        } finally {
            setIsPostPublishing(false);
        }
    }

    return (
        <div className="min-h-screen max-w-3xl mx-auto p-2">
            <h1 className=" text-center my-4 text-2xl font-semibold">
                Create a post
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                    />

                    <Select
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                [e.target.id]: e.target.value,
                            })
                        }
                        id="category"
                    >
                        <option value="uncategorized">Select a category</option>
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
                        disabled={formData.image}
                    />
                    <Button
                        type="button"
                        className={`cursor-pointer bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800  font-semibold`}
                        onClick={handleUpload}
                        disabled={formData.image}
                    >
                        {isImageUploading ? (
                            <>
                                <Spinner
                                    aria-label="Alternate spinner button example"
                                    size="sm"
                                />
                                <span className="pl-3">Uploading...</span>
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
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello</p>"
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setFormData({ ...formData, content: data });
                    }}
                />
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
                                <span className="pl-3">Publishing...</span>
                            </>
                        ) : (
                            "Publish"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
