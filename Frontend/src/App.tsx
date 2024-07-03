import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

import DocSearch from "./features/patient/DocSearchScreen";
import DocFind from "./features/patient/DocFindScreen";
import AuthSide from "./AuthScreen";
import "vite/modulepreload-polyfill";
import Dashboard from "./features/patient/DashboardScreen";
import PhoneDashboard from "./features/phone/phoneDashboardScreen";
import ProfileScreen from "./features/patient/Profile";
import ManageAppointments from "./features/admin/manageAppointments";
import ManageDoctors from "./features/admin/manageDoctors";
import ManagePatients from "./features/admin/managePatients";
import AdminDashboard from "./features/admin/adminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthSide />} />
          <Route
            path="/find"
            element={
              <PrivateRoute
                element={<DocFind />}
                requiredRoles={["normal_user", "admin"]}
              />
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute
                element={<DocSearch />}
                requiredRoles={["normal_user", "admin"]}
              />
            }
          />
          <Route
            path="/docsearch"
            element={
              <PrivateRoute
                element={<DocSearch />}
                requiredRoles={["normal_user", "admin"]}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<Dashboard />}
                requiredRoles={["normal_user", "admin"]}
              />
            }
          />
          <Route
            path="/admindashboard"
            element={
              <PrivateRoute
                element={<AdminDashboard />}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute
                element={<ManageAppointments />}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute
                element={<ManageAppointments />}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/doctors"
            element={
              <PrivateRoute
                element={<ManageDoctors />}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute
                element={<ManagePatients />}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/phonedashboard"
            element={
              <PrivateRoute element={<PhoneDashboard />} requiredRoles={[]} />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<ProfileScreen />}
                requiredRoles={["normal_user"]}
              />
            }
          />
          <Route
            path="/find-doctors"
            element={
              <PrivateRoute
                element={<DocFind />}
                requiredRoles={["normal_user"]}
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
