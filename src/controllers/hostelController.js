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

// UPDATE
exports.updateHostel = async (req, res) => {
  try {
    const updated = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Hostel not found' });
    res.status(200).json({ message: 'Hostel updated', hostel: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating hostel', error: err.message });
  }
};


