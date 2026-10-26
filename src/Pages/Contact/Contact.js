import React from "react";
import ContactInfo from "../../Components/ContactInfo/ContactInfo";
import Location from "../../Components/Location/Location";
import ContactUs from "../../Components/ContactUs/ContactUs";
import { useLocation } from "react-router-dom";

function Contact() {
  const { pathname } = useLocation();

  return (
    <>
      <Location />
      {pathname.startsWith("/locations") ? (
        <ContactInfo />
      ) : (
        <></>
      )}
      <ContactUs />
    </>
  );
}

export default Contact;
