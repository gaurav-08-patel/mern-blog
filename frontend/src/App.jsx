import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Header from "./components/Header";
import FooterComp from "./components/FooterComp";
import { useAuthContext } from "./context/AuthContext";
import CreatePost from "./Pages/CreatePost";

function App() {
    let { authUser } = useAuthContext();

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <Home /> : <Navigate to={"/signin"} />}
                />
                <Route
                    path="/signup"
                    element={authUser ? <Navigate to={"/"} /> : <SignUp />}
                />
                <Route
                    path="/signin"
                    element={authUser ? <Navigate to={"/"} /> : <SignIn />}
                />
                <Route
                    path="/dashboard"
                    element={
                        authUser ? <Dashboard /> : <Navigate to={"/signin"} />
                    }
                />
                <Route
                    path="/createpost"
                    element={
                        authUser && authUser.isAdmin ? (
                            <CreatePost />
                        ) : (
                            <Navigate to={"/signin"} />
                        )
                    }
                />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <FooterComp />
        </BrowserRouter>
    );
}

export default App;
