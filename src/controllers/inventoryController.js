const inventoryService = require('../services/inventoryService');

exports.addItem = async (req, res) => {
  try {
    const item = await inventoryService.addItem(req.body);
    res.status(201).json({ success: true, message: 'Item added', data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.assignItemToRoom = async (req, res) => {
  try {
    const result = await inventoryService.assignItem(req.params.itemId, req.body.roomId);
    res.json({ success: true, message: 'Item assigned to room', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.reportIssue = async (req, res) => {
  try {
    const result = await inventoryService.reportIssue(req.params.itemId, req.body.status, req.body.notes);
    res.json({ success: true, message: 'Issue reported', data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await inventoryService.getAllItems();
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await inventoryService.updateItem(req.params.itemId, req.body);
    res.json({ success: true, message: 'Item updated', data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await inventoryService.deleteItem(req.params.itemId);
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await inventoryService.getItemById(req.params.itemId);
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
};
