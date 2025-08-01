const MealPlan = require('../models/MealPlan');
const MealAttendance = require('../models/MealAttendance');
const MealFeedback = require('../models/MealFeedback');

exports.createOrUpdatePlan = async ({ date, breakfast, lunch, dinner }) => {
  return await MealPlan.findOneAndUpdate(
    { date },
    { breakfast, lunch, dinner },
    { upsert: true, new: true }
  );
};

exports.markAttendance = async ({ studentId, date, mealType }) => {
  return await MealAttendance.findOneAndUpdate(
    { studentId, date, mealType },
    { present: true },
    { upsert: true, new: true }
  );
};

exports.giveFeedback = async ({ studentId, date, mealType, feedback }) => {
  return await MealFeedback.create({ studentId, date, mealType, feedback });
};

exports.getMealPlan = async (date) => {
  const plan = await MealPlan.findOne({ date });
  if (!plan) throw new Error('No meal plan found for this date');
  return plan;
};

exports.getAllPlans = async () => {
  return await MealPlan.find().sort({ date: -1 });
};

exports.getFeedbackByStudent = async (studentId) => {
  return await MealFeedback.find({ studentId }).sort({ createdAt: -1 });
};

exports.updateFeedback = async (feedbackId, feedback) => {
  return await MealFeedback.findByIdAndUpdate(feedbackId, { feedback }, { new: true });
};

exports.deleteFeedback = async (feedbackId) => {
  return await MealFeedback.findByIdAndDelete(feedbackId);
};

exports.getAttendanceByStudent = async (studentId) => {
  return await MealAttendance.find({ studentId }).sort({ date: -1 });
};

