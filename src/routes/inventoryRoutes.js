const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Add item
router.post('/', inventoryController.addItem);

// Assign item to room
router.patch('/:itemId/assign', inventoryController.assignItemToRoom);

// Report issue (damaged/lost)
router.patch('/:itemId/report', inventoryController.reportIssue);

// Get all items
router.get('/', inventoryController.getAllItems);

module.exports = router;

router.put('/:itemId', inventoryController.updateItem);
router.delete('/:itemId', inventoryController.deleteItem);
router.get('/:itemId', inventoryController.getItemById);
