import React from "react";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Privacy from "./Privacy";
import JoinUs from "./JoinUs";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import "../../Web.css";

const Home: React.FC = () => {
  return (
    <div className="h-full min-h-[100vh]">
      <Header />
      <HeroSection />
      <Services />
      <Privacy />
      <JoinUs />
      <Footer />
      {/* <CookiesModal /> */}
    </div>
  );
};

export default Home;
