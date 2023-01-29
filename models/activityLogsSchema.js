const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const activityLogSchema = new mongoose.Schema({
    userid: String,
    oldemail:String,
    newemail : String,
    oldpassword : String,
    newPassword : String,
    oldrole : String,
    newrole : String,
    updatedtime : String,
    createdtime : String
  });
  
  const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

  module.exports = ActivityLog;