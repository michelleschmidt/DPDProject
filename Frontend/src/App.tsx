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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthSide />} />
          <Route
            path="/find"
            element={<PrivateRoute element={<DocFind />} requiredRoles={[]} />}
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute element={<DocSearch />} requiredRoles={[]} />
            }
          />
          <Route
            path="/docsearch"
            element={
              <PrivateRoute element={<DocSearch />} requiredRoles={[]} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute element={<Dashboard />} requiredRoles={[]} />
            }
          />
          <Route
            path="/admindashboard"
            element={
              <PrivateRoute
                element={<ManageAppointments />}
                requiredRoles={["normal-user"]}
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
              <PrivateRoute element={<ProfileScreen />} requiredRoles={[]} />
            }
          />
          <Route
            path="/find-doctors"
            element={<PrivateRoute element={<DocFind />} requiredRoles={[]} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
