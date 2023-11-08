const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authorization");
require("dotenv").config();
const { User, Admin } = require("../models/userModel");

const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "Both email and password are required" });
    }

    let userFound = await User.findOne({ email });
    let adminFound = await Admin.findOne({ email });
    if (userFound || adminFound) {
      return res.status(409).send({ msg: "Email already exists" });
    }

    const realAdmin = email === process.env.ADMIN_EMAIL;

    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
 
    if (realAdmin) {
      await Admin.create({ email, password: hashPassword });
    } else {
      await User.create({ email, password: hashPassword });
    }
    return res.status(201).send({ msg: "Registered successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error qq" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "Both email and password are required" });
    }

    let user = await User.findOne({ email });
    let adminUser = await Admin.findOne({ email });
    if (!user || !adminUser) {
      const users = user || adminUser;
      let validPassword = await bcrypt.compare(password, users.password);
      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid email or password" });
    } else {
      let token = jwt.sign(
        { email: users.email, id: users._id },
        process.env.PRIVATE_KEY
      );
      res.status(200).send({ msg: "Login successful", token });
    }
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error gg" });
  }
};

module.exports = { register, login };
