const Complaint = require('../models/Complaint');

exports.createComplaint = async ({ studentId, issueTitle, issueDescription }) => {
  return await Complaint.create({ studentId, issueTitle, issueDescription });
};

exports.getAllComplaints = async () => {
  return await Complaint.find()
    .populate('studentId', 'fullName email')
    .populate('assignedTo', 'fullName email')
    .sort({ createdAt: -1 });
};

exports.updateStatus = async (id, status) => {
  return await Complaint.findByIdAndUpdate(id, { status }, { new: true });
};

exports.assignStaff = async (id, staffId) => {
  return await Complaint.findByIdAndUpdate(id, { assignedTo: staffId }, { new: true });
};

exports.getComplaintById = async (id) => {
  return await Complaint.findById(id)
    .populate('studentId', 'fullName email')
    .populate('assignedTo', 'fullName email');
};

exports.updateComplaint = async (id, data) => {
  return await Complaint.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteComplaint = async (id) => {
  return await Complaint.findByIdAndDelete(id);
};
