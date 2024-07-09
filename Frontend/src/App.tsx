import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

import "vite/modulepreload-polyfill";
import ManageAppointments from "./features/admin/manageAppointments";
import ManageDoctors from "./features/admin/manageDoctors";
import ManagePatients from "./features/admin/managePatients";
import AdminDashboard from "./features/admin/adminDashboard";
import Home from "./features/home/Home";
import SignUp from "./features/home/SignIn";
import SignIn from "./features/home/LoginIn";
import DoctorDashboard from "./features/doctor/doctorDashboard";
import PatientDashboard from "./features/patient/patientDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
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
            path="/patientdashboard"
            element={
              <PrivateRoute
                element={<PatientDashboard />}
                requiredRoles={["normal_user"]}
              />
            }
          />
          <Route
            path="/doctordashboard"
            element={
              <PrivateRoute
                element={<DoctorDashboard />}
                requiredRoles={["doctor"]}
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
