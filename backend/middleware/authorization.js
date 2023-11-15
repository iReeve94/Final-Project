const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

 const verifyToken = (req, res, next) => {
    try {
      // Check 
      if (!req.headers.authorization) {
        return res.status(403).send({ msg: "Token does not exist." });
      }
  
      let receivedToken = req.headers.authorization.split(" ")[1];
      
      // Check token 
      if (!receivedToken) {
        return res.status(403).send({ msg: "Token does not exist." });
      }
  
      let verifiedToken = jwt.verify(receivedToken, process.env.PRIVATE_KEY);
      
      // Check token verified
      if (!verifiedToken) {
        return res.status(401).send({ msg: "Not authorized." });
      }
  
      // Attach information 
      req.user = verifiedToken;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Internal server error from auth." });
    }
  
    
  };

 

module.exports = verifyToken;