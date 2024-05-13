const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Memory', memorySchema);
