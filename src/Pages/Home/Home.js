import React from 'react'
import CalculateBMI from "../../Components/CalculateBMI/CalculateBMI";
import Location from "../../Components/Location/Location";
import MainCarousel from "../../Components/MainCarousel/MainCarousel";
import Quotes from "../../Components/Quotes/Quotes";
import AboutUs from "../../Pages/About/About";
import Training from "../Training/Training";
import Trainers from './../../Components/Trainers/Trainers';


function Home() {
  return (
    <>
    <MainCarousel />
    <AboutUs />
    <Quotes/>
    <Training />
    <Trainers />
    <Location />
    </>
  )
}

export default Home