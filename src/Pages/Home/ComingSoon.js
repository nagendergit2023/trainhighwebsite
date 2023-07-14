import React from 'react';
import "./ComingSoon.css";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";

function ComingSoon() {
  return (
    <section className="comingsoon_screen">
      <img src={TrainHighGymLogo} className="main_title img-fluid w-25 rounded-circle infinite-flip" />
        <p className="main_title">ARE YOU READY?</p>
        {/* <p className="main_title">JANAKPURI</p> */}
        <div className="dark_overlay"></div>
    </section>
  )
}

export default ComingSoon;