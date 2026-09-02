import React, { useState } from "react";
import "./LocationMicro.css";
import RajouriGarden from "../../assets/images/locations/rajouri_Garden.jpg"
import Janakpuri from "../../assets/images/locations/janakpuri.jpg"
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function LocationMicro() {
  const locations = [
    {
      image: Janakpuri,
      name: "New Delhi, Jankapuri",
      address: "A-3/30, Block A3, Janakpuri, New Delhi - 110058",
      website: `/locations/janakpuri`,
    },
    {
      image: RajouriGarden,
      name: "New Delhi, Rajouri Garden",
      address:
        "Ground Floor, ESI-Basaidarapur Metro Station, New Delhi - 110027",
        website: `/locations/rajouri-garden`,
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <section className="py-lg-5 pt-5 pb-0">
      <div className="container">
        <h2 className="section-title">OUR LOCATIONS</h2>
        <p className="text-center px-lg-5 px-2 mb-5">
          Discover where we’re proudly serving communities around you.
        </p>
        <div className="row justify-content-around align-items-center">
          
            {locations.map((loc, index) => (
              <div className="col-lg-6 mb-lg-0 mb-3" key={index} >
 <div className="location-card">
  <div
    className={`location-image-wrapper ${
      selectedLocation.name === loc.name ? "active" : ""
    }`}
    onClick={() => setSelectedLocation(loc)}
  >
    <Image
      src={loc.image}
      className="w-100 img-fluid location-image"
      alt={loc.name}
    />

    <div className="location-overlay">
      <div className="location-content">
        <h5 className="mb-2 text-white fw-bold">{loc.name}</h5>
        <Link
          to={loc.website}
          target="_self"
          rel="noopener noreferrer"
          className="visit-btn"
        >
          Visit Website →
        </Link>
      </div>
    </div>
  </div>
</div>
            </div>
))}

        </div>
      </div>
    </section>
  );
}

export default LocationMicro;
