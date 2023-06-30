const bcrypt = require("bcrypt");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { username, email, password ,role } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.json({ message: "Username is already used ", success: false });
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.json({ message: "Email is already used ", success: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      role,
    });
    await user.save();
    delete user.password;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "Invalid email or password", success: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ msg: "Invalid email or password", success: false });
    }
    delete user.password;
    const token = await jwt.sign(
      { id: user?._id?.valueOf() },
      process.env.JWT_SECRET
    );
    return res.json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

module.exports = { register, login };
