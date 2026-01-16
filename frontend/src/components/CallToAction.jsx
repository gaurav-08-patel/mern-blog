import { Button } from "flowbite-react";

const CallToAction = () => {
    return (
        <div className="p-4 border border-teal-400 rounded-tl-4xl rounded-br-4xl flex flex-col gap-3 md:flex-row my-5">
            <div className="flex flex-col gap-2 text-center flex-1 justify-center">
                <h1 className="text-xl font-semibold">
                    Want to learn HTML , CSS and JavaScript by building fun and
                    engaging projects.
                </h1>
                <p className="text-slate-600">
                    Check 100 js projects website and start building your own
                    projects.
                </p>
                <Button className="bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800 font-semibold rounded-none rounded-tl-xl rounded-br-xl">
                    <a href="https://www.100jsprojects.com" className="w-full">
                        100 js Projects website
                    </a>
                </Button>
            </div>
            <img
                src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png"
                className=" md:w-1/2 p-4"
            />
        </div>
    );
};

export default CallToAction;
