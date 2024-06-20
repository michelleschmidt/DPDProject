import React from "react";
import GenericForm, { FormField } from "./forms/GenericForm";

const LoginForm: React.FC<{
  onSubmit: (data: Record<string, any>) => void;
}> = ({ onSubmit }) => {
  const fields: FormField[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      isRequired: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      isRequired: true,
    },
  ];

  return (
    <GenericForm fields={fields} onSubmit={onSubmit} buttonText="Sign In" />
  );
};

export default LoginForm;
