import { useAuthContext } from "../context/AuthContext";

const ThemeProvider = ({ children }) => {
    let { theme } = useAuthContext();
    
    
    return (
        <div className={theme}>
            <div className="bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200">
                {children}
            </div>
        </div>
    );
};
export default ThemeProvider;
