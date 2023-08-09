import React from 'react';
import "./ComingSoon.css";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import { BiLogoFacebook, BiLogoWhatsapp, BiPhoneCall, BiLogoInstagram } from 'react-icons/bi';

function ComingSoon() {
  return (
    <section className="comingsoon_screen">
      <img src={TrainHighGymLogo} className="main_title img-fluid w-25 rounded-circle infinite-flip" />
        <p className="main_title">OPENING SOON!</p>
        <div className="d-flex align-items-center gap-4 position-relative z-1 ">
          <a href="https://instagram.com/trainhighgym?igshid=NjIwNzIyMDk2Mg==" className="social-icon-wrapper text-white" target="_blank">
          <BiLogoInstagram className="social-icon" /> 
          </a>
          {/* <a href="" className="social-icon-wrapper text-white">
          <BiLogoFacebook className="social-icon" /> 
          </a>
          <a href="" className="social-icon-wrapper text-white">
          <BiPhoneCall className="social-icon" /> 
          </a>
          <a href="" className="social-icon-wrapper text-white">
          <BiLogoWhatsapp className="social-icon" /> 
          </a> */}
        </div>
        <div className="dark_overlay"></div>
    </section>
  )
}

export default ComingSoon;