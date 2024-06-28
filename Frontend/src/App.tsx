import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

import DocSearch from "./DocSearchScreen";
import DocFind from "./DocFindScreen";
import AuthSide from "./AuthScreen";
import "vite/modulepreload-polyfill";
import Dashboard from "./features/Dashboards/DashboardScreen";
import PhoneDashboard from "./features/Dashboards/phoneDashboardScreen";
import ProfileScreen from "./features/user/Profile";

const App = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthSide
                onSubmit={(email, password) => {
                  console.log("Submitted", email, password);
                }}
                isRegistration={isRegistration}
              />
            }
          />
          <Route
            path="/find"
            element={<PrivateRoute element={<DocFind />} />}
          />
          <Route
            path="/booking"
            element={<PrivateRoute element={<DocSearch />} />}
          />
          <Route
            path="/docsearch"
            element={<PrivateRoute element={<DocSearch />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/phonedashboard"
            element={<PrivateRoute element={<PhoneDashboard />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfileScreen />} />}
          />
          <Route
            path="/find-doctors"
            element={<PrivateRoute element={<DocFind />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
