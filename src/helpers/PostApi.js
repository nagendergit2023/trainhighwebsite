// var urlString = "http://trainhighgym.com:3309/trainhighgym-api/";
var urlString = "http://localhost:5000/trainhighgym-api/";
var access = sessionStorage.getItem("access");

const PostApiCall = {
  postRequest(userData, url) {
    return fetch(urlString + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
        "x-auth-token": access,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("request failed", error);
        return error;
      });
  },
};

export default PostApiCall;
