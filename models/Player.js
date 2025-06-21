const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Can be a default name if no login
  score: { type: Number, default: 0 },
  collectedItems: { type: [String], default: [] },
  timeSpent: { type: Number, default: 0 }, // in seconds
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', playerSchema);
