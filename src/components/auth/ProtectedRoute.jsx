import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser, isLoggedIn } from "../../utils/auth";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const location = useLocation();

    // User is not logged in
    if (!isLoggedIn()) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Get logged-in user
    const user = getUser();

    // Token exists but user data is missing
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check role
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        // Patient cannot access admin dashboard
        if (user.role === "patient") {
            return <Navigate to="/" replace />;
        }

        // Any other unauthorized role
        return <Navigate to="/" replace />;
    }

    // Authorized user
    return <Outlet />;
};

export default ProtectedRoute;