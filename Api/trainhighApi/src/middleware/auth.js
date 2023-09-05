const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    await jwt.verify(token, "secret_key", (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.data;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
