import React, { useEffect } from "react";
import CalculateBMI from "../../Components/CalculateBMI/CalculateBMI.js";
import Location from "../../Components/Location/Location.js";
import MainCarousel from "../../Components/MainCarousel/MainCarousel.js";
import Quotes from "../../Components/Quotes/Quotes.js";
import AboutUs from "../../Pages/About/About.js";
import Training from "../Training/Training.js";
import Trainers from "./../../Components/Trainers/Trainers.js";
import HeroMain from "../../Components/HeroMain/HeroMain.js";
import { Header } from "antd/es/layout/layout.js";

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
      <CalculateBMI />     
      <Quotes />       
      <Trainers />
      <Location />      
    </>
  );
}

export default Home;
