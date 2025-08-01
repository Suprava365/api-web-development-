const visitorService = require('../services/visitorService');

exports.logVisitor = async (req, res) => {
  try {
    const visitor = await visitorService.logVisitor(req.body);
    res.status(201).json({ success: true, message: 'Visitor logged', data: visitor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await visitorService.getAllVisitors();
    res.json({ success: true, data: visitors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyVisitor = async (req, res) => {
  try {
    const result = await visitorService.verifyVisitor(req.params.visitorId);
    res.json({ success: true, message: 'Visitor verified', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.updateVisitor = async (req, res) => {
  try {
    const updated = await visitorService.updateVisitor(req.params.visitorId, req.body);
    res.json({ success: true, message: 'Visitor updated', data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    await visitorService.deleteVisitor(req.params.visitorId);
    res.json({ success: true, message: 'Visitor deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
