const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/occupancy', reportController.getOccupancyRate);
router.get('/due-fees', reportController.getDueFees);
router.get('/complaints', reportController.getComplaintStats);
router.get('/room-assignments', reportController.getRoomAssignments);
router.get('/download', reportController.downloadReport); // placeholder

module.exports = router;
