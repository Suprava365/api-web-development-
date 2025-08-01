// src/infrastructures/database/model/room.model.js
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["single", "double", "deluxe", "suite"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amenities: [String],
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance"],
    default: "available",
  },
  capacity: {
    type: Number,
    default: 1,
  },
  description: String,
  images: [String], // array of image URLs
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
