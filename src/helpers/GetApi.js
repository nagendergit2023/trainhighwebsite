import React from "react";
import { useEffect, useContext } from "react";
// import { store } from "../Store";

var urlString = "http://localhost:3306/trainhighgym-api/";

const GetApiCall = {
  getRequest(url) {
    console.log(urlString + url);
    return fetch(urlString + url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
    });
  },
};

export default GetApiCall;
