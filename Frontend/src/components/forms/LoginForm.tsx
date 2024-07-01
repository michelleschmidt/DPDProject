import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import GenericForm, { FormField } from "./GenericForm";
import { useAuth } from "../auth/AuthContext";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleSubmit = (formData: any) => {
    axiosInstance
      .post("/api/auth/login", {
        email: formData.emailDoctor,
        password: formData.password,
      })
      .then((response) => {
        const { token, user } = response.data;
        console.log("Login successful:", response.data);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        login(token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <GenericForm fields={fields} onSubmit={handleSubmit} buttonText="Sign In" />
  );
};

export default LoginForm;
