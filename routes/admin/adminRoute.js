const { Router } = require("express");
const router = Router();
const authAdmin = require("../.././middlewares/authAdmin");
const {
  LoginAdmin,
  Add,
  View,
  Update,
  addUser,
  addAdmin,
  viewAll,
  updateUser,
  updateAdmin,
} = require("../../controllers/adminControllers");

//Login API for Admins
router.post("/login", LoginAdmin);

//API for add admin
router.post("/add", Add);

//API for getting all data of admin itself
router.get("/view", authAdmin, View);

//API for updating admin information
router.put("/update", authAdmin, Update);

//API for admin to add new user
router.post("/addUser", authAdmin, addUser);

//API for admin can add another admin
router.post("/addAdmin", authAdmin, addAdmin);

//API for admin to view all admins/Users/all
router.get("/viewAll", authAdmin, viewAll);

//API for admin can update another user
router.put("/updateUser/:email", authAdmin, updateUser);

//API for admin can update another user
router.put("/updateAdmin/:email", authAdmin, updateAdmin);

module.exports = router;
