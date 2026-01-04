import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
                    <form className="flex flex-col gap-3">
                        <div>
                            <Label className="font-semibold">
                                Your username
                            </Label>
                            <TextInput
                                type="text"
                                placeholder="Username"
                                id="username"
                            />
                        </div>
                        <div>
                            <Label className="font-semibold">Your email</Label>
                            <TextInput
                                type="text"
                                placeholder="xzy@gmail.com"
                                id="email"
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
                            />
                        </div>

                        <Button className="cursor-pointer bg-linear-to-r from-purple-500 to-pink-500 text-white hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800">
                            Sign Up
                        </Button>
                    </form>
                    <p className="mt-2">
                        Have an account ? <Link to='/signin' className="text-cyan-600">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
