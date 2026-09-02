import React, { useEffect } from "react";
// import CalculateBMI from "../../Components/CalculateBMI/CalculateBMI.js";
import LocationMicro from "../../Components/LocationMicro/LocationMicro.js";
// import MainCarousel from "../../Components/MainCarousel/MainCarousel.js";
import Quotes from "../../Components/Quotes/Quotes.js";
import AboutUs from "../../Pages/About/About.js";
import Training from "../Training/Training.js";
// import Trainers from "./../../Components/Trainers/Trainers.js";
import HeroMain from "../../Components/HeroMain/HeroMain.js";
import ContactUs from "../../Components/ContactUs/ContactUs.js";
// import { Header } from "antd/es/layout/layout.js";

function Home() {
  useEffect(() => {
    sessionStorage.removeItem("access");
  }, []);
  return (
    <>
      {/* <MainCarousel /> */}
      <HeroMain />
      <AboutUs />
      <Training />
      {/* <CalculateBMI /> */}
      {/* <Trainers /> */}
      <LocationMicro />    
      <Quotes />  
      <ContactUs />
    </>
  );
}

export default Home;
