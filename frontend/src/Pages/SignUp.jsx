import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
    let [formData, setFormData] = useState({});
    let [errorMessage, setErrorMessage] = useState(null);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("All fields are required !");
        }

        try {
            setLoading(true);
            const res = await fetch(
                "mern-blog-production-674c.up.railway.app/api/auth/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                },
            );

            let data = await res.json();
            // console.log(data);

            if (data.error) {
                return setErrorMessage("Username or email is already taken .");
            }

            if (res.ok) {
                navigate("/signin");
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="flex flex-col mx-auto   p-8 gap-5 sm:flex-row lg:max-w-[70vw]">
                {/* left section */}
                <div className="sm:flex-1 flex flex-col justify-center">
                    <Link className=" dark:text-white font-bold text-5xl">
                        <span className="px-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white py-1">
                            Gaurav's
                        </span>
                        Blog
                    </Link>
                    <p className="mt-4 leading-5">
                        This is my blog. You can sing up with your email and
                        password or continue with Google.
                    </p>
                </div>
                {/* right section */}
                <div className="sm:flex-1">
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <Label className="font-semibold">
                                Your username
                            </Label>
                            <TextInput
                                type="text"
                                placeholder="Username"
                                id="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">Your email</Label>
                            <TextInput
                                type="text"
                                placeholder="xzy@gmail.com"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">
                                Your password
                            </Label>
                            <TextInput
                                type="password"
                                placeholder="password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="cursor-pointer bg-linear-to-r from-purple-500 to-pink-500 text-white hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
                            disabled={loading}
                        >
                            {loading && (
                                <>
                                    <Spinner
                                        aria-label="Alternate spinner button example"
                                        size="sm"
                                    />
                                    <span className="pl-3">Loading...</span>
                                </>
                            )}
                            {!loading && "Sign Up"}
                        </Button>
                        <OAuth />
                    </form>
                    <p className="mt-2">
                        Have an account ?{" "}
                        <Link to="/signin" className="text-cyan-600">
                            Sign In
                        </Link>
                    </p>
                    {errorMessage && (
                        <Alert color="failure" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
