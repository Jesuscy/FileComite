const mongoose = require("mongoose");

const meetingUserSchema = new mongoose.Schema({

  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  roles:[{type: String}]
})

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
  meetingUsers: [meetingUserSchema]
});

const Meeting = mongoose.model('Meeting',meetingSchema,'meetings');
module.exports = Meeting
