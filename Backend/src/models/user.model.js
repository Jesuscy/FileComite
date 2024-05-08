const mongoose = require("mongoose");

const userSchema = new moongose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: String,
  
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }] 

});

const User = mongoose.model('User',userSchema,'users');

module.exports = User