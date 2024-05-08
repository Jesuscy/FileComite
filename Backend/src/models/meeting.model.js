const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema({
  meetingName: {
    type: String,
    require: true,
    unique: true,
  },
  meetingPath: {
    type: String,
    require: true,
    unique: true,
  },
  meetingRoles: [{ type: String }],
  meetingUsers: [{type: mongoose.Schema.Types.ObjectId, ref:'Users'}]
});

const Meeting = mongoose.model('Meeting',meetingSchema,'meetings');
module.exports = Meeting
