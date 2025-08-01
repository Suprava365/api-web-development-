const reportService = require('../services/reportService');

exports.getOccupancyRate = async (req, res) => {
  try {
    const rate = await reportService.calculateOccupancyRate();
    res.json({ success: true, data: rate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDueFees = async (req, res) => {
  try {
    const due = await reportService.getDueFees();
    res.json({ success: true, data: due });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getComplaintStats = async (req, res) => {
  try {
    const stats = await reportService.getComplaintStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getRoomAssignments = async (req, res) => {
  try {
    const assignments = await reportService.getRoomAssignments();
    res.json({ success: true, data: assignments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

