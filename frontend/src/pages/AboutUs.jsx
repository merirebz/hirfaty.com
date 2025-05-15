import React from "react";
import AboutUs from "../components/Route/aboutUs/aboutUs";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Aboutus = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Aboutus;
