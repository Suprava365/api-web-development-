const Booking = require('../models/Booking');

exports.createBooking = async (data) => {
  return await Booking.create(data);
};

exports.updateBookingStatus = async (id, status) => {
  return await Booking.findByIdAndUpdate(id, { status }, { new: true });
};

exports.markAsPaid = async (id) => {
  return await Booking.findByIdAndUpdate(id, { paymentStatus: 'paid' }, { new: true });
};

exports.getAllBookings = async () => {
  return await Booking.find().populate('studentId roomId');
};

exports.getBookingById = async (id) => {
  return await Booking.findById(id).populate('studentId roomId');
};

exports.updateBooking = async (id, data) => {
  return await Booking.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};
