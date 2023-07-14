import React from 'react'
import CalculateBMI from "../../Components/CalculateBMI/CalculateBMI";
import MainCarousel from "../../Components/MainCarousel/MainCarousel";
import AboutUs from "../../Pages/About/About";
import Training from "../Training/Training";


function Home() {
  return (
    <>
    <MainCarousel />
    <AboutUs />
    <Training />
    <CalculateBMI />
    </>
  )
}

export default Home