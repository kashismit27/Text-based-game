const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gameDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define player schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  score: Number,
  collectedItems: [String],
  gameElapsed: Number // in seconds
});

const Player = mongoose.model('Player', playerSchema);

// 🎯 Save game data - POST /api/player/save
app.post('/api/player/save', async (req, res) => {
  const { name, state } = req.body;

  try {
    let player = await Player.findOne({ name });

    if (!player) {
      player = new Player({ name });
    }

    player.score = state.score;
    player.collectedItems = state.collectedItems;
    player.gameElapsed = state.gameElapsed;

    await player.save();
    res.json({ message: "✅ Game saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving game:", err);
    res.status(500).json({ message: "❌ Failed to save game" });
  }
});

// 🎯 Load game data - GET /api/player/load/:name
app.get('/api/player/load/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const player = await Player.findOne({ name });
    res.json({ player });
  } catch (err) {
    console.error("❌ Error loading game:", err);
    res.status(500).json({ message: "❌ Failed to load game" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
