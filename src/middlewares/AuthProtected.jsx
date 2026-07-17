import { Navigate, useLocation } from "react-router-dom";

const AuthProtected = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const location = useLocation();
    return token ? children : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default AuthProtected;  