// PrivateRoute.tsx

import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

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
    isAuthenticated && userData && requiredRoles.includes(userData.role);

  return isAuthorized ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
