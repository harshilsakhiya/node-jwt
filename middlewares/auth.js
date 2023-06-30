const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

const withAuth = async (req, _res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) throw new Error("Token not provided!");

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!decoded?.id) throw new Error("Failed to verify token!");

    const user = await User.findOne({ _id: decoded.id }).lean();
    if (!user?._id) throw new Error("User not found!");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { withAuth };
