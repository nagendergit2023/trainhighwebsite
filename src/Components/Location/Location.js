import React, { useState } from "react";
import "./Location.css";

function Location() {
  const locations = [
    {
      name: "Train High Gym - Jankapuri",
      address: "A-3/30, Block A3, Janakpuri, New Delhi - 110058",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14009.229170865778!2d77.0799457!3d28.6205509!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d059e3b88d55b%3A0xe349ff0dec1cf755!2sTrain%20High%20Gym!5e0!3m2!1sen!2sin!4v1689707705917!5m2!1sen!2sin",
    },
    {
      name: "Train High Gym - Rajouri Garden",
      address:
        "Ground Floor, ESI-Basaidarapur Metro Station, New Delhi - 110027",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0488484840007!2d77.1275654!3d28.658255999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03ab29c459f9%3A0x7b549f62d058f23b!2sTrain%20High%20Gym!5e0!3m2!1sen!2sin!4v1762445426536!5m2!1sen!2sin",
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <section class="py-lg-5 py-5">
      <div className="container-fluid">
        <h2 className="section-title">Our Locations</h2>
        <p className="text-center px-lg-5 px-2 mb-5">
          Discover where we’re proudly serving communities around you.
        </p>
        <div className="row">
          {/* LEFT SIDE - LOCATION LIST */}
          <div className="col-lg-4">
            <div className="location-list shadow-sm rounded-4 p-3">
              {locations.map((loc, index) => (
                <div
                  key={index}
                  className={`location-item p-3 mb-3 rounded-3 ${
                    selectedLocation.name === loc.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedLocation(loc)}
                >
                  <h5 className="mb-1 fw-semibold">{loc.name}</h5>
                  <p className="mb-0 small">{loc.address}</p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE - GOOGLE MAP */}
          </div>
          <div className="col-lg-8 mt-lg-0 mt-4">
            <div className="map-card shadow-lg rounded-4 overflow-hidden">
              <iframe
                src={selectedLocation.embedUrl}
                title={selectedLocation.name}
                width="100%"
                height="auto"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-frame"
              ></iframe>
            </div>
          </div>

          {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14009.229170865778!2d77.0799457!3d28.6205509!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d059e3b88d55b%3A0xe349ff0dec1cf755!2sTrain%20High%20Gym!5e0!3m2!1sen!2sin!4v1689707705917!5m2!1sen!2sin"
        width="100%"
        height="auto"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe> */}
        </div>
      </div>
    </section>
  );
}

export default Location;
