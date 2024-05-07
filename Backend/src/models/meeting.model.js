const mongoose = require("mongoose")
const meetingSchema = new mongoose.Schema({

    meetingName:{
        type: String,
        require: true,
        unique: true
    },
    meetingPath:{
        type: String,
        require: true,
        unique: true
    },
    meetingRoles: [{ type: String}]
})

module.exports = {meetingSchema}