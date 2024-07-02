import React, { useState } from "react";
import Button from "./components/Button";
import Map from "./components/MapLogin";
import Footer from "./components/Footer";
import LoginForm from "./components/forms/LoginForm";
import RegistrationForm from "./components/forms/RegistrationForm";

const AuthSide: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  interface UserLocation {
    latitude: number;
    longitude: number;
  }

  return (
    <>
      <Button
        onClick={() => setIsRegistration(!isRegistration)}
        color="light"
        to="#"
      >
        {isRegistration ? "Already have an account? Sign In" : "Register Here"}
      </Button>
      {isRegistration ? <RegistrationForm /> : <LoginForm />}

      <div className="map-container-login">
        <Map
          radius={0}
          setUserLocation={function (
            value: React.SetStateAction<UserLocation | null>
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <Footer isFixed={true} />
    </>
  );
};

export default AuthSide;
