const { Router } = require("express");
const router = Router();
const authUser = require("../../middlewares/authUser");

const {
    Add,
    userLogin,
} = require("../../controllers/userControllers");


//login API for users
router.post("/login", userLogin);

//API for adding users
router.post("/add", Add);

module.exports = router;