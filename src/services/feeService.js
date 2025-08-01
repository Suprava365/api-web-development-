const Fee = require('../models/Fee');

exports.generateInvoice = async ({ studentId, month, rentAmount }) => {
  const existing = await Fee.findOne({ studentId, month });
  if (existing) throw new Error("Invoice already exists for this month.");

  return await Fee.create({
    studentId,
    month,
    rentAmount,
    dueAmount: rentAmount,
  });
};

exports.recordPayment = async (feeId, paidAmount) => {
  const fee = await Fee.findById(feeId);
  if (!fee) throw new Error("Fee record not found");

  fee.paidAmount += paidAmount;
  fee.dueAmount = Math.max(fee.rentAmount + fee.fine - fee.paidAmount, 0);

  if (fee.paidAmount >= fee.rentAmount + fee.fine) {
    fee.status = 'paid';
  } else if (fee.paidAmount > 0) {
    fee.status = 'partial';
  }

  fee.paymentDate = new Date();

  return await fee.save();
};

exports.applyFine = async (feeId, fineAmount) => {
  const fee = await Fee.findById(feeId);
  if (!fee) throw new Error("Fee record not found");

  fee.fine += fineAmount;
  fee.dueAmount += fineAmount;

  return await fee.save();
};

exports.getStudentFees = async (studentId) => {
  return await Fee.find({ studentId }).sort({ month: -1 });
};

exports.getFeeById = async (id) => {
  return await Fee.findById(id).populate('studentId');
};

exports.updateFee = async (id, data) => {
  return await Fee.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteFee = async (id) => {
  return await Fee.findByIdAndDelete(id);
};

exports.getAllFees = async () => {
  return await Fee.find().populate('studentId').sort({ createdAt: -1 });
};
