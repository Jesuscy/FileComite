const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: [{type:String}],
  
  mettings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Metting' }] 

});

const User = mongoose.model('User',userSchema,'users');

module.exports = User