const express = require('express');
const router = express.Router();
const {
  createHostel,
  getAllHostels,
  updateHostel,
  deleteHostel
} = require('../controllers/hostelController');

router.get('/', getAllHostels);
router.post('/', createHostel);
router.put('/:id', updateHostel);
router.delete('/:id', deleteHostel);

module.exports = router;
