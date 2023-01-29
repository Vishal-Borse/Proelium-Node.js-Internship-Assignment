const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require("./models/usersSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ActivityLog = require("./models/activityLogsSchema");

dotenv.config();
app.use(express.static("public"));
app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Socket io
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {

  //socket event for saving the activity log of user when they update anything
  socket.on("update-user", async (userData) => {
    // userData = {oldemail, oldpassword, newemail, newpassword, oldrole, newrole}
    const userDetails = JSON.parse(userData);

    const existingUser = await User.findOne({
      email: userDetails.oldemail,
      role: userDetails.oldrole,
    });

    const newHashedPassword = await bcrypt.hash(
      userDetails.newpassword,
      saltRounds
    );

    if (existingUser) {
      const matchPassword = bcrypt.compare(
        userDetails.oldpassword,
        existingUser.password
      );

      if (matchPassword) {
        const updatedUser = {
          email: userDetails.newemail,
          password: newHashedPassword,
          confirmPassword: newHashedPassword,
          role: userDetails.newrole,
          updatedtime: new Date().toLocaleTimeString(),
        };

        await User.updateOne(
          { email: userDetails.oldemail, role: userDetails.oldrole },
          updatedUser
        );

        const existActivityLogs = await ActivityLog.findOne({
          userid: existingUser._id,
        });

        if (existActivityLogs) {
          const activityLogs = {
            oldemail: userDetails.oldemail,
            newemail: userDetails.newemail,
            oldpassword: await bcrypt.hash(userDetails.oldpassword, saltRounds),
            newPassword: newHashedPassword,
            oldrole: userDetails.oldrole,
            newrole: userDetails.newrole,
            updatedtime: new Date().toLocaleTimeString(),
            createdtime: existingUser.createdtime,
          };
          await ActivityLog.updateOne(
            { userid: existingUser._id },
            activityLogs
          );
        } else {
          const activitylogs = new ActivityLog({
            userid: existingUser._id,
            oldemail: userDetails.oldemail,
            newemail: userDetails.newemail,
            oldpassword: userDetails.oldpassword,
            newPassword: newHashedPassword,
            oldrole: userDetails.oldrole,
            newrole: userDetails.newrole,
            updatedtime: new Date().toLocaleTimeString(),
            createdtime: existingUser.createdtime,
          });
          await ActivityLog.create(activitylogs);
          console.log(activitylogs);
        }
        socket.emit("success","Task Completed");
      } else {
        console.log("Invalid credentials");
      }
    } else {
      console.log("User not found");
      socket.emit("failure","Task not  Completed")
    }
  });
});

server.listen(3000, (err) => {
  if (err) console.error(error);
  else console.log("Listening on 3000");
});

const adminRoute = require("./routes/admin/adminRoute");
const userRoute = require("./routes/user/userRoute");
const { findOneAndUpdate } = require("./models/activityLogsSchema");
const e = require("express");

app.use("/admin", adminRoute);
app.use("/user", userRoute);
