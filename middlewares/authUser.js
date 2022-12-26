const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

//auth middleware for admins
const authAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      let user = jwt.verify(token, process.env.SECRET2);
      req.adminid = user.adminId;
    } else {
      res.status(401).send("Unauthorized Admin");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized Admin");
  }
};

module.exports = authAdmin;
