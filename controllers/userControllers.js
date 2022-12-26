const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/usersSchema");

const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email: userEmail, role: "user" });
    if (!existingUser) {
      res.status(404).send("User not found");
    }
    const matchPassword = await bcrypt.compare(
      userPassword,
      existingUser.password
    );

    if (!matchPassword) {
      res.status(400).send("Invalid Credentials");
    }
    const token = jwt.sign(
      { userEmail: existingUser.email, userId: existingUser._id },
      process.env.SECRET1
    );
    res.status(201).json({
      message: "User Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const Add = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    userEmail,
    userPassword,
    confirmUserPassword,
    userDepartment,
  } = req.body;

  if (userPassword.length > 12 || userPassword.length < 6) {
    res.status(400).json({
      message: "Password must have 6 to 12 characters",
    });
  }
  if (confirmUserPassword != userPassword) {
    res.status(400).json({
      message: "password and Confirm Password must be the same",
    });
  }

  try {
    const existingUser = await User.findOne({
      email: userEmail,
      role: "user",
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const user = new User({
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      email: userEmail,
      password: hashedPassword,
      confirmPassowrd: hashedPassword,
      role: "user",
      department: userDepartment,
      createdtime: new Date().toLocaleTimeString(),
      updatedtime: "",
    });

    const result = await User.create(user);
    res.status(201).json({
      message: "User created",
      admin: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const View = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userid });
    res.status(200).json({
      User: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const Update = async (req, res) => {
  try {
    const { firstName, middleName, lastName, userDepartment } = req.body;

    const user = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      department: userDepartment,
      updatedtime: new Date().toLocaleTimeString(),
    };
    const result = await User.findByIdAndUpdate(req.userid, user, {
      new: true,
    });
    res.status(201).json({
      message: "User updated successfully",
      updatedUser: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const viewAllUsers = async (req, res) => {
  try {
    const result = await User.find({ role: "user" });
    res.status(200).json({
      Users: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, userDepartment } = req.body;

    const user = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      department: userDepartment,
      updatedtime: new Date().toLocaleTimeString(),
    };
    const result = await User.findOneAndUpdate(
      { email: req.params.email, role: "user" },
      user
    );
    res.status(201).json({
      message: "User updated successfully",
      updatedUser: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  userLogin,
  Add,
  View,
  Update,
  viewAllUsers,
  updateUser,
};
