var urlString = "http://68.178.170.174:3309/trainhighgym-api/";
// var urlString = "http://localhost:3307/trainhighgym-api/";
var access = sessionStorage.getItem("access");
const GetApiCall = {
  getRequest(url) {
    return fetch(urlString + url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
        auth: access,
      },
    });
  },
};

export default GetApiCall;
