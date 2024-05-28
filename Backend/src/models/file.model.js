const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  meetingData:{
    meetingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
    rol:[{type: String, required: true}]
  }
});

const File = mongoose.model('File',fileSchema,'files');
module.exports = File
