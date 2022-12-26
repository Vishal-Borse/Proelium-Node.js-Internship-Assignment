const { Router } = require("express");
const router = Router();
const authUser = require("../../middlewares/authUser");

const Add = require("../.././controllers/userControllers");

//API for adding users
router.post("/add", Add);

module.exports = router;