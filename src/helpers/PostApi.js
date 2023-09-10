var urlString = "http://68.178.170.174:3307/trainhighgym-api/";

const PostApiCall = {
  postRequest(userData, url) {
    return fetch(urlString + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        // console.log(response)
        return response;
      })
      .catch((error) => {
        console.log("request failed", error);
        return error;
      });
  },
};

export default PostApiCall;
