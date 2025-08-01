const noticeService = require('../services/noticeService');

exports.createNotice = async (req, res) => {
  try {
    const result = await noticeService.createNotice(req.body);
    res.status(201).json({ success: true, message: 'Notice created', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.markAsRead = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const { studentId } = req.body;
    const result = await noticeService.markAsRead(noticeId, studentId);
    res.json({ success: true, message: 'Notice marked as read', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}; 

exports.getNoticeById = async (req, res) => {
  try {
    const result = await noticeService.getNoticeById(req.params.noticeId);
    if (!result) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const result = await noticeService.updateNotice(req.params.noticeId, req.body);
    res.json({ success: true, message: 'Notice updated', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    await noticeService.deleteNotice(req.params.noticeId);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

