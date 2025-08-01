const Notice = require('../models/Notice');

exports.createNotice = async ({ title, message, postedBy }) => {
  return await Notice.create({ title, message, postedBy });
};

exports.getAllNotices = async (studentId) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  return notices.map(notice => ({
    ...notice.toObject(),
    isRead: notice.readBy.includes(studentId)
  }));
};

exports.markAsRead = async (noticeId, studentId) => {
  return await Notice.findByIdAndUpdate(
    noticeId,
    { $addToSet: { readBy: studentId } },
    { new: true }
  );
}; 

exports.getNoticeById = async (id) => {
  return await Notice.findById(id).populate('postedBy', 'fullName email');
};

exports.updateNotice = async (id, data) => {
  return await Notice.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteNotice = async (id) => {
  return await Notice.findByIdAndDelete(id);
};

