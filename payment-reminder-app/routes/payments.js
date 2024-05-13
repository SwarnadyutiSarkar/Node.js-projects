const express = require('express');
const router = express.Router();

const Payment = require('../models/Payment');

// @route   GET /api/payments
// @desc    Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/payments
// @desc    Create a new payment
router.post('/', async (req, res) => {
  const payment = new Payment({
    description: req.body.description,
    amount: req.body.amount,
    dueDate: req.body.dueDate,
    // Add more fields as needed
  });

  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
