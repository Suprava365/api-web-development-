const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');

router.post('/invoice', feeController.generateInvoice);
router.patch('/:feeId/pay', feeController.recordPayment);
router.patch('/:feeId/fine', feeController.applyLateFee);
router.get('/history/:studentId', feeController.getFeeHistory);

module.exports = router;

router.get('/', feeController.getAllFees);
router.get('/:feeId', feeController.getFeeById);
router.put('/:feeId', feeController.updateFee);
router.delete('/:feeId', feeController.deleteFee);
