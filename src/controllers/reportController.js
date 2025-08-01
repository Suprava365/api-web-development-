const reportService = require('../services/reportService');

exports.getOccupancyRate = async (req, res) => {
  try {
    const rate = await reportService.calculateOccupancyRate();
    res.json({ success: true, data: rate });
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

// Placeholder for future PDF/Excel
exports.downloadReport = async (req, res) => {
  res.json({ success: true, message: 'PDF/Excel export coming soon.' });
};
