const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/usersSchema");

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

module.exports = Add;
