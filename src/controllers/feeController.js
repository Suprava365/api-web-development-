const feeService = require('../services/feeService');

exports.generateInvoice = async (req, res) => {
  try {
    const result = await feeService.generateInvoice(req.body);
    res.status(201).json({ success: true, message: "Invoice created", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const { feeId } = req.params;
    const result = await feeService.recordPayment(feeId, req.body.paidAmount);
    res.json({ success: true, message: "Payment recorded", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.applyLateFee = async (req, res) => {
  try {
    const { feeId } = req.params;
    const result = await feeService.applyFine(feeId, req.body.fineAmount);
    res.json({ success: true, message: "Fine applied", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getFeeHistory = async (req, res) => {
  try {
    const result = await feeService.getStudentFees(req.params.studentId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getFeeById = async (req, res) => {
  try {
    const result = await feeService.getFeeById(req.params.feeId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(404).json({ success: false, message: "Fee record not found" });
  }
};

exports.updateFee = async (req, res) => {
  try {
    const result = await feeService.updateFee(req.params.feeId, req.body);
    res.json({ success: true, message: "Fee updated", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteFee = async (req, res) => {
  try {
    await feeService.deleteFee(req.params.feeId);
    res.json({ success: true, message: "Fee record deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllFees = async (req, res) => {
  try {
    const result = await feeService.getAllFees();
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
