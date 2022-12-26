const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

//auth middleware for users
const authUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      let user = jwt.verify(token, process.env.SECRET1);
      req.userid = user.userId;
    } else {
      res.status(401).send("Unauthorized User");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized User");
  }
};

module.exports = authUser;
