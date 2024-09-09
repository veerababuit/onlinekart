const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin)
      return res.status(403).json({ msg: "Admin access required" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = adminAuth;
