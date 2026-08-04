import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminProtected({ children }) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.role !== "admin") {
            return <Navigate to="/" replace />;
        }

        return children;

    } catch (error) {
        console.error("Error decoding token:", error);
        sessionStorage.removeItem("token");
        return <Navigate to="/auth" replace />;
    }
}