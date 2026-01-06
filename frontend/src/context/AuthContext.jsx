import { useState, useContext, createContext, useEffect } from "react";

export let authContext = createContext();

export let AuthContextProvider = ({ children }) => {

    //context for theme///////////////////////
    
    let [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem("blogApp-theme")) || "light"
    );

    useEffect(() => {
        localStorage.setItem("blogApp-theme", JSON.stringify(theme));
    }, [theme]);

    ///////////////////////////////////////////

    let [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("blogApp-user-info")) || null
    );

    function saveAuthUser(data) {
        localStorage.setItem("blogApp-user-info", JSON.stringify(data));
        setAuthUser(data);
    }

    return (
        <authContext.Provider value={{ authUser, saveAuthUser , theme , setTheme}}>
            {children}
        </authContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(authContext);
};
