const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Booking endpoints
router.post('/', bookingController.createBooking);
router.patch('/:bookingId/status', bookingController.updateStatus);
router.patch('/:bookingId/paid', bookingController.markAsPaid);
router.get('/', bookingController.getBookings);

module.exports = router;

router.get('/:bookingId', bookingController.getBookingById);   // GET /booking/:id
router.put('/:bookingId', bookingController.updateBooking);    // PUT /booking/:id
router.delete('/:bookingId', bookingController.deleteBooking); // DELETE /booking/:id
