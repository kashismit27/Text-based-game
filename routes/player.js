// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/api/player/save', gameController.saveGameState);
router.get('/api/player/load/:username', gameController.loadGameState);

module.exports = router;
