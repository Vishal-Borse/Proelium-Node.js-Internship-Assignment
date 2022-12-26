const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const app = express();

const adminRoute = require("./routes/admin/adminRoute");
const userRoute = require("./routes/user/userRoute");

dotenv.config();
app.use(express.static("public"));
app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });


app.use("/admin",adminRoute);
app.use("/user",userRoute);