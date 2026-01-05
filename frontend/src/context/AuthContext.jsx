import { useState, useContext, createContext } from "react";

export let authContext = createContext();

export let AuthContextProvider = ({ children }) => {
    let [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("blogApp-user-info")) || null
    );

    function saveAuthUser(data) {
        localStorage.setItem("blogApp-user-info", JSON.stringify(data));
        setAuthUser(data);
    }

    return (
        <authContext.Provider value={{ authUser, saveAuthUser }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(authContext);
};
