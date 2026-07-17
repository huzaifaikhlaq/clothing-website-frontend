import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedToken = sessionStorage.getItem('token');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Login funtion 
    const login = (user, token) => {
        setUser(user);
        setToken(token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
    };

    // Logout funtion 
    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    const value = { user, token, login, logout, Authenticated: !!token };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// custom Hook 
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}