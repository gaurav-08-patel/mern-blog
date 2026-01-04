import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Header from "./components/Header";
import FooterComp from "./components/FooterComp";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <FooterComp/>
        </BrowserRouter>
    );
}

export default App;
