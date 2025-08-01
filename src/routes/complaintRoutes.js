const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Student submits complaint
router.post('/', complaintController.createComplaint);

// Admin/staff views all
router.get('/', complaintController.getAllComplaints);

// Admin updates status
router.patch('/:complaintId/status', complaintController.updateStatus);

// Admin assigns staff
router.patch('/:complaintId/assign', complaintController.assignStaff);

module.exports = router;

router.get('/:complaintId', complaintController.getComplaintById);   // Get single complaint
router.put('/:complaintId', complaintController.updateComplaint);    // Update complaint
router.delete('/:complaintId', complaintController.deleteComplaint); // Delete complaint

