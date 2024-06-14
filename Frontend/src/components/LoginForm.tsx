import React from "react";
import GenericForm from "./forms/GenericForm";

const LoginForm: React.FC<{
  onSubmit: (data: Record<string, any>) => void;
}> = ({ onSubmit }) => {
  const fields = [
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "Enter email",
      isRequired: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      isRequired: true,
    },
  ];

  return (
    <GenericForm fields={fields} onSubmit={onSubmit} buttonLabel="Sign In" />
  );
};

export default LoginForm;
