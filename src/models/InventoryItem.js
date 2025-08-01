const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['available', 'assigned', 'damaged', 'lost'],
    default: 'available'
  },
  assignedRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    default: null
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventorySchema);
