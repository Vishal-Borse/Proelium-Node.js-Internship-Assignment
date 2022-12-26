const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const LoginAdmin = async (req, res) => {
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
    adminEmail,
    adminPassword,
    confirmAdminPassword,
    adminDepartment,
  } = req.body;

  if (adminPassword.length > 12 || adminPassword.length < 6) {
    res.status(400).json({
      message: "Password must have 6 to 12 characters",
    });
  }
  if (confirmAdminPassword != adminPassword) {
    res.status(400).json({
      message: "password and Confirm Password must be the same",
    });
  }
  try {
    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin",
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const admin = new User({
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      email: adminEmail,
      password: hashedPassword,
      confirmPassowrd: hashedPassword,
      role: "admin",
      department: adminDepartment,
      createdtime: new Date().toLocaleTimeString(),
      updatedtime: "",
    });

    const result = await User.create(admin);
    res.status(201).json({
      message: "Admin created",
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
    const admin = await User.findOne({ _id: req.adminid });
    res.status(200).json({
      Admin: admin,
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
    const { firstName, middleName, lastName, adminDepartment } = req.body;

    const admin = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      department: adminDepartment,
      updatedtime: new Date().toLocaleTimeString(),
    };
    const result = await User.findByIdAndUpdate(req.adminid, admin, {
      new: true,
    });
    res.status(201).json({
      message: "Admin updated successfully",
      updatedAdmin: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const addUser = async (req, res) => {
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

const addAdmin = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    adminEmail,
    adminPassword,
    confirmAdminPassword,
    adminDepartment,
  } = req.body;

  if (adminPassword.length > 12 || adminPassword.length < 6) {
    res.status(400).json({
      message: "Password must have 6 to 12 characters",
    });
  }
  if (confirmAdminPassword != adminPassword) {
    res.status(400).json({
      message: "password and Confirm Password must be the same",
    });
  }
  try {
    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin",
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const admin = new User({
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      email: adminEmail,
      password: hashedPassword,
      confirmPassowrd: hashedPassword,
      role: "admin",
      department: adminDepartment,
      createdtime: new Date().toLocaleTimeString(),
      updatedtime: "",
    });

    const result = await User.create(admin);
    res.status(201).json({
      message: "Admin created",
      admin: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const viewAll = async (req, res) => {
  const role = req.query.role;
  try {
    if (role.toLowerCase() == "all") {
      const result1 = await User.find();
      res.status(201).json({
        all: result1,
      });
    } else {
      const result2 = await User.find({ role: role.toLowerCase() });
      res.status(201).json({
        all: result2,
      });
    }
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

const updateAdmin = async (req, res) => {
  try {
    const { firstName, middleName, lastName, adminDepartment } = req.body;

    const admin = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      department: adminDepartment,
      updatedtime: new Date().toLocaleTimeString(),
    };
    const result = await User.findOneAndUpdate(
      { email: req.params.email, role: "admin" },
      admin
    );
    res.status(201).json({
      message: "Admin updated successfully",
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
  LoginAdmin,
  Add,
  View,
  Update,
  addUser,
  addAdmin,
  viewAll,
  updateUser,
  updateAdmin,
};
