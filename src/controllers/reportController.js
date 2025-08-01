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


// Placeholder for future PDF/Excel
exports.downloadReport = async (req, res) => {
  res.json({ success: true, message: 'PDF/Excel export coming soon.' });
};
