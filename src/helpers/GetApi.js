var urlString = "https://trainhighgym.com/trainhighgym-api/";
// var urlString = "http://localhost:5000/";
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
        "x-auth-token": access,
      },
    });
  },
};

export default GetApiCall;
