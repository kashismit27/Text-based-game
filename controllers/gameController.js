// controllers/gameController.js
const GameState = require('../models/GameState');

// Save game state
exports.saveGameState = async (req, res) => {
  try {
     const { name, score, collectedItems, timeSpent } = req.body;

    const newState = new GameState({
      username: name,
      score,
      collectedItems:collectedItems || [],
      gameElapsed:gameElapsed || 0
    });

    await newState.save();
    res.status(200).json({ message: 'Game saved successfully!' });
  } catch (err) {
    console.error('❌ Error saving game:', err);
    res.status(500).json({ error: 'Failed to save game.' });
  }
};

// Load game state
exports.loadGameState = async (req, res) => {
  try {
    const { username } = req.params;

    const player = await GameState.findOne({ username }).sort({ createdAt: -1 });

    if (!player) {
      return res.status(404).json({ message: 'No saved game found for this username.' });
    }

    res.status(200).json({ player });
  } catch (err) {
    console.error('❌ Error loading game:', err);
    res.status(500).json({ error: 'Failed to load game.' });
  }
};
