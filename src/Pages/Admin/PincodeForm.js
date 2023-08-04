import React, { useState } from "react";
import axios from "axios";

const PincodeForm = () => {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincode(value);

    // Make an API call to fetch city and state based on pincode
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${value}`
      );

      if (
        response.data &&
        response.data[0] &&
        response.data[0].Status === "Success"
      ) {
        const { City, State } = response.data[0].PostOffice[0];
        setCity(City);
        setState(State);
      } else {
        setCity("");
        setState("");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setCity("");
      setState("");
    }
  };

  return (
    <div>
      <label>Pincode:</label>
      <input type="text" value={pincode} onChange={handlePincodeChange} />
      <br />
      <label>City:</label>
      <input type="text" value={city} readOnly />
      <br />
      <label>State:</label>
      <input type="text" value={state} readOnly />
    </div>
  );
};

export default PincodeForm;
