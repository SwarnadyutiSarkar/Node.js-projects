const express = require('express');
const router = express.Router();

const Memory = require('../models/Memory');

// @route   GET /api/memories
// @desc    Get all memories
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/memories
// @desc    Create a new memory
router.post('/', async (req, res) => {
  const memory = new Memory({
    title: req.body.title,
    description: req.body.description,
    // Add more fields as needed
  });

  try {
    const newMemory = await memory.save();
    res.status(201).json(newMemory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
