const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitorName: { type: String, required: true },
  relation: { type: String, required: true },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'verified'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('VisitorLog', visitorSchema);
