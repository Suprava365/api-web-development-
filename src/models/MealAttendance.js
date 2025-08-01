const mongoose = require('mongoose');

const mealAttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  present: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MealAttendance', mealAttendanceSchema);
