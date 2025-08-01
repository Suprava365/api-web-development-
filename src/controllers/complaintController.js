const complaintService = require('../services/complaintService');

exports.createComplaint = async (req, res) => {
  try {
    const result = await complaintService.createComplaint(req.body);
    res.status(201).json({ success: true, message: "Complaint submitted", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const result = await complaintService.getAllComplaints();
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const result = await complaintService.updateStatus(complaintId, req.body.status);
    res.json({ success: true, message: "Status updated", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.assignStaff = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const result = await complaintService.assignStaff(complaintId, req.body.staffId);
    res.json({ success: true, message: "Staff assigned", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const result = await complaintService.getComplaintById(req.params.complaintId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Complaint not found' });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const result = await complaintService.updateComplaint(req.params.complaintId, req.body);
    res.json({ success: true, message: "Complaint updated", data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    await complaintService.deleteComplaint(req.params.complaintId);
    res.json({ success: true, message: "Complaint deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
