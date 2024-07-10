import React, { useState, useCallback } from "react";
import AdminHeader from "../../components/layout/adminHeader";
import Button from "../../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";
import axiosInstance from "../../axios/Axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        { timeout: 5000 }
      ); // Set a timeout for the request

      if (response.status === 201 && response.data) {
        const userData = response.data;

        if (userData && userData.role) {
          login(userData); // Pass the entire userData object
          // Navigate based on role
          if (userData.role === "admin") {
            navigate("/admindashboard");
          } else if (userData.role === "doctor") {
            navigate("/doctordashboard");
          } else if (userData.role === "normal_user") {
            navigate("/patientdashboard");
          } else {
            setError("Unknown user role");
          }
        } else {
          setError("Invalid user data received from server");
        }
      } else {
        setError("Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred during login"
        );
      } else if (error.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isLoading, login, navigate]);

  return (
    <div className="h-screen w-full">
      <AdminHeader text={""} />
      <div className="h-full w-full gap-8 flex bg-blue-50 flex-col items-center pt-28">
        <div className="flex flex-col gap-8 w-[400px] h-3/5 bg-white rounded-2xl px-5 py-6 shadow-custom">
          <h1 className="text-center text-blue-600 font-semibold text-3xl">
            Login
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">Email*</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">Password*</span>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {isLoading ? (
              <div className="text-center">Signing in...</div>
            ) : (
              <Button
                onClick={handleLogin}
                text="Sign in"
                className="text-center"
              />
            )}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div className="text-center text-sm">
              If you do not have an account yet, please sign in here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
