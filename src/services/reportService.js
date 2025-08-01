const Room = require('../models/Room');
const User = require('../models/User');
const Fee = require('../models/Fee');
const Complaint = require('../models/Complaint');

exports.calculateOccupancyRate = async () => {
  const totalRooms = await Room.countDocuments();
  const occupiedRooms = await Room.countDocuments({ isOccupied: true });

  const rate = (occupiedRooms / totalRooms) * 100;
  return { totalRooms, occupiedRooms, occupancyRate: `${rate.toFixed(2)}%` };
};

exports.getDueFees = async () => {
  const allDue = await Fee.find({ status: { $in: ['unpaid', 'partial'] } }).populate('studentId');
  return allDue;
};

exports.getComplaintStats = async () => {
  const total = await Complaint.countDocuments();
  const pending = await Complaint.countDocuments({ status: 'pending' });
  const inProgress = await Complaint.countDocuments({ status: 'in-progress' });
  const resolved = await Complaint.countDocuments({ status: 'resolved' });

  return { total, pending, inProgress, resolved };
};

exports.getRoomAssignments = async () => {
  return await Room.find().populate('assignedStudents', 'fullName email');
};
