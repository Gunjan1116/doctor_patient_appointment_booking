const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"],default:"patient", required: true },
  location:{ type: String, required: true },
  specialty:String,
});

const Usermodel = mongoose.model('user', userSchema);

module.exports={
    Usermodel
}
