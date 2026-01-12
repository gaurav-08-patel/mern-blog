import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const CreatePost = () => {
    let [text, setText] = useState("");

    return (
        <div className="min-h-screen max-w-3xl mx-auto p-2">
            <h1 className="text-center my-4 text-2xl font-semibold">
                Create a post
            </h1>
            <form className="flex flex-col gap-4">
                <div className="flex justify-between flex-col sm:flex-row gap-2">
                    <TextInput
                        placeholder="Title"
                        type="text"
                        id="title"
                        className="flex-1"
                    />

                    <Select>
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
                    />
                    <Button
                        type="button"
                        className="bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer font-semibold"
                    >
                        Upload Image
                    </Button>
                </div>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello</p>"
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data);
                    }}
                />
            </form>
        </div>
    );
};

export default CreatePost;
