const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

// Admin/staff
router.post('/', noticeController.createNotice);

// Students
router.get('/', noticeController.getNotices);
router.patch('/:noticeId/read', noticeController.markAsRead);

module.exports = router;

router.get('/:noticeId', noticeController.getNoticeById);
router.put('/:noticeId', noticeController.updateNotice);
router.delete('/:noticeId', noticeController.deleteNotice);
