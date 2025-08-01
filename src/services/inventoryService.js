const InventoryItem = require('../models/InventoryItem');

exports.addItem = async ({ itemName, quantity }) => {
  return await InventoryItem.create({ itemName, quantity });
};

exports.assignItem = async (itemId, roomId) => {
  return await InventoryItem.findByIdAndUpdate(
    itemId,
    { assignedRoom: roomId, status: 'assigned' },
    { new: true }
  );
};

exports.reportIssue = async (itemId, status, notes) => {
  if (!['damaged', 'lost'].includes(status)) throw new Error('Invalid status');

  return await InventoryItem.findByIdAndUpdate(
    itemId,
    { status, notes },
    { new: true }
  );
};

exports.getAllItems = async () => {
  return await InventoryItem.find().populate('assignedRoom');
};

exports.updateItem = async (itemId, data) => {
  return await InventoryItem.findByIdAndUpdate(itemId, data, { new: true });
};

exports.deleteItem = async (itemId) => {
  return await InventoryItem.findByIdAndDelete(itemId);
};

exports.getItemById = async (itemId) => {
  return await InventoryItem.findById(itemId).populate('assignedRoom');
};
