import React, { useEffect } from "react";
import CalculateBMI from "../../Components/CalculateBMI/CalculateBMI.js";
import Location from "../../Components/Location/Location.js";
import MainCarousel from "../../Components/MainCarousel/MainCarousel.js";
import Quotes from "../../Components/Quotes/Quotes.js";
import AboutUs from "../../Pages/About/About.js";
import Training from "../Training/Training.js";
import Trainers from "./../../Components/Trainers/Trainers.js";

function Home() {
  useEffect(() => {
    sessionStorage.removeItem("access");
  }, []);
  return (
    <>
      <MainCarousel />
      <AboutUs />
      <Quotes />
      <Training />
      <Trainers />
      <Location />
      <CalculateBMI />
    </>
  );
}

export default Home;
