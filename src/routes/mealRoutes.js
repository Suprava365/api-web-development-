const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Admin updates menu
router.post('/plan', mealController.createOrUpdateMealPlan);

// Get plan by date
router.get('/plan/:date', mealController.getMealPlanByDate);

// Student marks attendance
router.post('/attendance', mealController.markAttendance);

// Student gives feedback
router.post('/feedback', mealController.giveFeedback);
router.get('/plan', mealController.getAllMealPlans);
router.get('/feedback/:studentId', mealController.getFeedbackByStudent);
router.put('/feedback/:feedbackId', mealController.updateFeedback);
router.delete('/feedback/:feedbackId', mealController.deleteFeedback);
router.get('/attendance/:studentId', mealController.getAttendanceByStudent);


module.exports = router;
