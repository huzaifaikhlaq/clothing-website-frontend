import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProfileProtected({ children }) {
    const token = sessionStorage.getItem("token");

    try {
        return jwtDecode(token).role === "admin"
            ? <Navigate to="/admin/overview" replace />
            : children;
    } catch {
        return children;
    }
}