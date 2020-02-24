const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  // Get tokeb from header
  const token = req.header("x-auth-token"); // Will be sending token in x-auth-token header

  // Check if token doesnt exist
  if (!token) {
    return res.status(401).json({ msg: "Access denied." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token." });
  }
};
