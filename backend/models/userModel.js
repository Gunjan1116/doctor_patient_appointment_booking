const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['doctor', 'patient'],default:"patient", required: true },
  specialty:String,
  location:String
});

module.exports = mongoose.model('User', userSchema);
