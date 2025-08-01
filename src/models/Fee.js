const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: String, // e.g., "2025-07"
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
  fine: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid',
  },
  paymentDate: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
