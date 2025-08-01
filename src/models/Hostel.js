const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  warden: { type: String },
  contact: { type: String },
  status: { type: String, default: 'Active' },
  numberOfRooms: { type: Number, default: 0 },
  hasParking: { type: Boolean, default: false },
  hasCafeteria: { type: Boolean, default: false },
  description: { type: String },
  wifiAvailable: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);
