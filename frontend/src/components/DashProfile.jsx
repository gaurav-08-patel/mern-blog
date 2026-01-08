import { Button, TextInput } from "flowbite-react";
import { useAuthContext } from "../context/AuthContext";

const DashProfile = () => {
    let { authUser } = useAuthContext();
    return (
        <div className=" w-full">
            <div className=" max-w-lg mx-auto">
                <h1 className="text-center font-semibold text-3xl my-6">
                    Profile
                </h1>
                <form className="flex flex-col items-center mt-4 gap-4">
                    <div className="h-32 w-32 rounded-full border-5 border-[lightgray] shadow-xl self-center">
                        <img
                            src={authUser.profilePicture}
                            alt="Profile picture"
                            className="w-full h-full rounded-full cursor-pointer object-cover"
                        />
                    </div>
                    <TextInput
                        className="w-full"
                        type="text"
                        placeholder="Username"
                        id="username"
                        defaultValue={authUser.username}
                    />
                    <TextInput
                        className="w-full"
                        type="email"
                        placeholder="Email"
                        id="email"
                        defaultValue={authUser.email}
                    />
                    <TextInput
                        className="w-full"
                        type="password"
                        placeholder="Password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 cursor-pointer font-semibold"
                    >
                        Update
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
