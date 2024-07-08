import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRoles: string[]; // Array of required roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRoles,
}) => {
  const { isAuthenticated, userData } = useAuth();

  // Check if the user is authenticated and has the required role
  const isAuthorized =
    isAuthenticated && userData && requiredRoles.includes(userData.role || "");

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/signin" replace />;
  }

  if (!isAuthorized) {
    // If authenticated but not authorized, redirect to an unauthorized page or show an error
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the protected component
  return element;
};

export default PrivateRoute;
