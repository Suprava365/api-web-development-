const mongoose = require('mongoose');

const mealFeedbackSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  feedback: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MealFeedback', mealFeedbackSchema);
