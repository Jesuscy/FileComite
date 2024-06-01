const mongoose = require("mongoose");

const meetingUserSchema = new mongoose.Schema({

  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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


meetingSchema.methods.addRoleToUser = async (userId, rol) =>{
  const user = await MeetingUserSchema.find(meetingUser => meetingUser.userId.toString() === userId.toString())
  if (user) {
      if (!user.roles.inclundes(rol)) {
          user.roles.push(rol)
          await user.save()
      }
      else {
        throw new Error('User already have this rol');
      }
  } else {
    throw new Error('User not found');

  }
}

meetingSchema.methods.removeRoleFormUser = async (userId, rol) =>{
  const user = await MeetingUserSchema.find(meetingUser => meetingUser.userId.toString() === userId.toString())
  if (user) {
      const roleIndex = user.roles.indexOf(rol)
      if (roleIndex > -1) {
        user.roles.splice(roleIndex, 1)
        await this.save()
      }
      else {
        throw new Error('User not using this rol');
      }
  } else {
    throw new Error('User not found');

  }

}


const Meeting = mongoose.model('Meeting',meetingSchema,'meetings');
const MeetingUserSchema = mongoose.model('MeetingUser', meetingUserSchema)
module.exports = Meeting
