const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g., "2025-07-07"
  breakfast: String,
  lunch: String,
  dinner: String,
}, { timestamps: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);
