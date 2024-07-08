import React, { useState, useCallback } from "react";
import AdminHeader from "../../components/layout/adminHeader";
import Button from "../../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";
import axiosInstance from "../../Axios";
import debounce from "lodash.debounce";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const debouncedSetEmail = useCallback(debounce(setEmail, 300), []);
  const debouncedSetPassword = useCallback(debounce(setPassword, 300), []);

  const handleLogin = useCallback(async () => {
    if (isLoading) return; // Prevent multiple clicks while loading

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 201) {
        const userData = response.data;
        console.log("Response: ", userData);
        login(userData);

        if (userData.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/doctordashboard");
        }
      } else {
        setError("Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response) {
        if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(
            error.response.data.message || "An error occurred during login"
          );
        }
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
                onChange={(e) => debouncedSetEmail(e.target.value)}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">Password*</span>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => debouncedSetPassword(e.target.value)}
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
              If you do not have an account yet, please use our Helpcenter for
              further information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
