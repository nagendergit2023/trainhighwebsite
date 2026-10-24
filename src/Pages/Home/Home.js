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
import { Helmet } from "react-helmet";
// import { Header } from "antd/es/layout/layout.js";

function Home() {
  useEffect(() => {
    sessionStorage.removeItem("access");
  }, []);
  return (
    <>
      <Helmet>
        <title>Train High Gym | Fitness &amp; Training in New Delhi</title>
        <meta
          name="description"
          content="Explore fitness training, classes, and gym locations in Janakpuri and Rajouri Garden, New Delhi. Contact Train High Gym to ask about memberships or arranging a visit."
        />
        <link rel="canonical" href="https://trainhighgym.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Train High Gym" />
        <meta
          property="og:title"
          content="Train High Gym | Fitness &amp; Training in New Delhi"
        />
        <meta
          property="og:description"
          content="Explore fitness training, classes, and gym locations in Janakpuri and Rajouri Garden, New Delhi. Contact Train High Gym to ask about memberships or arranging a visit."
        />
        <meta property="og:url" content="https://trainhighgym.com/" />
        <meta
          property="og:image"
          content="https://trainhighgym.com/static/media/train_high_gym_logo.75668cdca92b388ae16d.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Train High Gym | Fitness &amp; Training in New Delhi"
        />
        <meta
          name="twitter:description"
          content="Explore fitness training, classes, and gym locations in Janakpuri and Rajouri Garden, New Delhi. Contact Train High Gym to ask about memberships or arranging a visit."
        />
        <meta
          name="twitter:image"
          content="https://trainhighgym.com/static/media/train_high_gym_logo.75668cdca92b388ae16d.png"
        />
      </Helmet>
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
