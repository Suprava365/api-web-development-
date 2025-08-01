// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName:  { type: String, required: true },
//   email:     { type: String, required: true, unique: true },
//   password:  { type: String, required: true },
//   role : {type: String, required: false, default: "User"},
//   status : {type: String, required: false, default: "Active"}
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, default: "User" },
  status:    { type: String, default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
