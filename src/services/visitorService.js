const VisitorLog = require('../models/VisitorLog');

exports.logVisitor = async ({ studentId, visitorName, relation, timeIn, timeOut }) => {
  return await VisitorLog.create({ studentId, visitorName, relation, timeIn, timeOut });
};

exports.getAllVisitors = async () => {
  return await VisitorLog.find()
    .populate('studentId', 'fullName email')
    .sort({ createdAt: -1 });
};

exports.verifyVisitor = async (visitorId) => {
  return await VisitorLog.findByIdAndUpdate(visitorId, { status: 'verified' }, { new: true });
};
exports.updateVisitor = async (visitorId, updateData) => {
  return await VisitorLog.findByIdAndUpdate(visitorId, updateData, { new: true });
};

exports.deleteVisitor = async (visitorId) => {
  return await VisitorLog.findByIdAndDelete(visitorId);
};
