import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    let { saveAuthUser } = useAuthContext();
    let navigate = useNavigate();
    const auth = getAuth(app);
    async function handleGoogle() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);

            let res = await fetch(
                "mern-blog-production-674c.up.railway.app/api/auth/google",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: resultsFromGoogle.user.displayName,
                        email: resultsFromGoogle.user.email,
                        googlePhotoUrl: resultsFromGoogle.user.photoURL,
                    }),
                },
            );

            let data = await res.json();
            if (res.ok) {
                saveAuthUser(data);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            onClick={handleGoogle}
            type="button"
            className="text-black cursor-pointer  bg-linear-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500"
        >
            <AiFillGoogleCircle className="h-6 w-6 mr-2" />
            <span>Continue with Google</span>
        </Button>
    );
};

export default OAuth;
