// models/GameState.js
const mongoose = require('mongoose');

const gameStateSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, default: 0 },
  collectedItems: { type: [String], default: [] },
  gameElapsed: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('GameState', gameStateSchema);
