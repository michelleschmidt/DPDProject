import React, { useState } from "react";
import AuthSide from "../AuthScreen";
import { Button } from "react-bootstrap";

const Auth: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  const handleSubmit = (email: string, password: string) => {
    // Call your backend API to register or sign in the user
  };

  return (
    <div className="auth-container">
      <h1>{isRegistration ? "Register" : "Sign In"}</h1>
      <AuthSide onSubmit={handleSubmit} isRegistration={isRegistration} />
      <p>
        {isRegistration ? "Already have an account?" : "Don't have an account?"}
        {/* Use Button component with variant="link" */}
        <Button
          variant="link"
          onClick={() => setIsRegistration(!isRegistration)}
        >
          {isRegistration ? "Sign In" : "Register"}
        </Button>
      </p>
    </div>
  );
};

export default Auth;
