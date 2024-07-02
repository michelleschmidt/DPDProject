import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import GenericForm, { FormField } from "./GenericForm";
import { useAuth } from "../auth/AuthContext";
import { useCookies } from "react-cookie";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [, setCookie] = useCookies(["token"]);

  const fields: FormField[] = [
    {
      name: "emailDoctor",
      type: "email",
      label: "Email address",
      placeholder: "Enter email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email: formData.emailDoctor,
        password: formData.password,
      });

      if (response.status === 201) {
        // Login successful
        const userData = response.data;
        console.log("Login successful. User data:", userData);

        // Use the user data to update your application state
        login(userData); // Pass the entire user data object to login

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // Handle login error (show message to user, etc.)
    }
  };

  return (
    <GenericForm fields={fields} onSubmit={handleSubmit} buttonText="Sign In" />
  );
};

export default LoginForm;
