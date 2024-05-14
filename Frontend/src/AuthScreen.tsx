import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface AuthSideProps {
  onSubmit: (email: string, password: string) => void;
  isRegistration: boolean;
}

const AuthSide: React.FC<AuthSideProps> = ({
  onSubmit = () => {},
  isRegistration = false,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {isRegistration ? "Register" : "Sign In"}
      </Button>
    </Form>
  );
};

export default AuthSide;
