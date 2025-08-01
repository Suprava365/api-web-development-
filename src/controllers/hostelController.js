const Hostel = require('../models/Hostel');

// CREATE
exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json({ message: 'Hostel created', hostel });
  } catch (err) {
    res.status(500).json({ message: 'Error creating hostel', error: err.message });
  }
};

// READ ALL
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ createdAt: -1 });
    res.status(200).json(hostels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hostels', error: err.message });
  }
};



// DELETE
exports.deleteHostel = async (req, res) => {
  try {
    const deleted = await Hostel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Hostel not found' });
    res.status(200).json({ message: 'Hostel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting hostel', error: err.message });
  }
};
