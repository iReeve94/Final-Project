const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    try{
        let clientToken =  req.headers.authorization.split(" ")[1];
    if(!clientToken){
        return res.status(403).send({ msg: "Token does not exist"});
    } else {
        let verifiedToken = jwt.verify(clientToken, process.env.PRIVATE_KEY)
        if(!verifiedToken){
            return res.status(401).send({ msg: "not authorized!"})
        } else {
            req.user = verifiedToken
            next()
        }
    }    
    } catch(error) {
        res.status(500).send({ msg: "Internal server error"})
    }
};


module.exports = verifyToken;