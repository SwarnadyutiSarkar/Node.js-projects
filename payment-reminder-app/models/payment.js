const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Payment', paymentSchema);
