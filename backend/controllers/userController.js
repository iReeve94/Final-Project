const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authorization");
require("dotenv").config();
const { User, Admin } = require("../models/userModel");

const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: "Both email and password are required." });
    }

    let adminFound = await Admin.findOne({ email });
    let userFound = await User.findOne({ email });

    if (userFound && userFound.password || adminFound && adminFound.password) {
      return res.send({ msg: "Email already registered, try another email"});
    }

    const realAdmin = email === process.env.ADMIN_EMAIL;
    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

    if (realAdmin) {
      await Admin.create({ email, password: hashPassword });
    } else {
      await User.create({ email, password: hashPassword });
    }

    return res.send({ msg: "Registered successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};



  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .send({ msg: "Both email and password are required." });
      }
  
      let adminUser = await Admin.findOne({ email });
      let simpleUser = await User.findOne({ email });
  
      if (adminUser || simpleUser) {
        let user = adminUser || simpleUser;
        let validPassword = await bcrypt.compare(password, user.password);
  
        if (!validPassword) {
          return res.status(401).send({ msg: "Invalid password" });
        } else {
          let token = jwt.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).send({ msg: "Logged in successfully.", token });
        }
      } else {
        return res.status(404).send({ msg: "Invalid email." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Internal server error. Login failed." });
    }
  };

module.exports = { register, login };
