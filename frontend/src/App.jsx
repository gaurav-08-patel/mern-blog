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
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
import Search from "./Pages/Search";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    let { authUser } = useAuthContext();

    return (
        <BrowserRouter > 
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
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
                <Route
                    path="/updatepost/:postId"
                    element={
                        authUser && authUser.isAdmin ? (
                            <UpdatePost />
                        ) : (
                            <Navigate to={"/signin"} />
                        )
                    }
                />
                <Route path="/projects" element={<Projects />} />
                <Route path="/post/:postSlug" element={<PostPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
            </Routes>
            <FooterComp />
        </BrowserRouter>
    );
}

export default App;
