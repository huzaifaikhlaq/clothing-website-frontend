import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        const storedToken = sessionStorage.getItem("token");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Login function
    const login = async (user, token) => {
        setUser(user);
        setToken(token);

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);

        try {
            await api.post("/cart/merge");

            console.log("Guest cart merged successfully");
        } catch (error) {
            console.error(
                "Guest cart merge failed:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    };

    const value = {
        user,
        token,
        login,
        logout,
        Authenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook
export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used within an AuthProvider"
        );
    }

    return context;
}