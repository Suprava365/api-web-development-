const mealService = require('../services/mealService');

exports.createOrUpdateMealPlan = async (req, res) => {
  try {
    const data = await mealService.createOrUpdatePlan(req.body);
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const result = await mealService.markAttendance(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.giveFeedback = async (req, res) => {
  try {
    const result = await mealService.giveFeedback(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.getMealPlanByDate = async (req, res) => {
  try {
    const result = await mealService.getMealPlan(req.params.date);
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};
exports.getAllMealPlans = async (req, res) => {
  try {
    const data = await mealService.getAllPlans();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getFeedbackByStudent = async (req, res) => {
  try {
    const result = await mealService.getFeedbackByStudent(req.params.studentId);
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const result = await mealService.updateFeedback(req.params.feedbackId, req.body.feedback);
    res.json({ success: true, message: "Feedback updated", data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    await mealService.deleteFeedback(req.params.feedbackId);
    res.json({ success: true, message: "Feedback deleted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const result = await mealService.getAttendanceByStudent(req.params.studentId);
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};