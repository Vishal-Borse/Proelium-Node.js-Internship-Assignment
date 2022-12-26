const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema({
    firstname: String,
    middlename: String,
    lastname: String,
    email: String,
    password: String,
    confirmPassowrd: String,
    role: String,
    department: String,
    createdtime: String,
    updatedtime: String,
  });
  
  const User = mongoose.model("User", userSchema);

  module.exports = User;