const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
  try {
    const result = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, message: 'Booking created', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.markAsPaid = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await bookingService.markAsPaid(bookingId);
    res.json({ success: true, message: 'Payment marked as paid', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.bookingId);
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Booking not found' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await bookingService.updateBooking(req.params.bookingId, req.body);
    res.json({ success: true, message: 'Booking updated', data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.bookingId);
    res.json({ success: true, message: 'Booking deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
