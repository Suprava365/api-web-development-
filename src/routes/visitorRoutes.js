const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Student logs visitor
router.post('/', visitorController.logVisitor);

// Admin views all
router.get('/', visitorController.getAllVisitors);

// Admin verifies
router.patch('/:visitorId/verify', visitorController.verifyVisitor);
router.put('/:visitorId', visitorController.updateVisitor);     // Update a visitor log
router.delete('/:visitorId', visitorController.deleteVisitor);  // Delete a visitor log

module.exports = router;
