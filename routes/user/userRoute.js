const { Router } = require("express");
const router = Router();
const authUser = require("../../middlewares/authUser");

const {
  userLogin,
  Add,
  View,
  Update,
  viewAllUsers,
  updateUser,
} = require("../.././controllers/userControllers");

//login API for users
router.post("/login", userLogin);

//API for adding users
router.post("/add", Add);

//API for getting all data of user itself
router.get("/view", authUser, View);

//API for updating user information
router.put("/update", authUser, Update);

//API for user to view all users
router.get("/viewAllUsers", authUser, viewAllUsers);

//API for user to update another user
router.post("/updateUser/:email", authUser, updateUser);

module.exports = router;
