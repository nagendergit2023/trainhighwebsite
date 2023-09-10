import React from "react";
import { useEffect, useContext } from "react";
// import { store } from "../Store";

var urlString = "http://68.178.170.174:3307/trainhighgym-api/";

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
