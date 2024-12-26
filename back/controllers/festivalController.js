const festivals = require('../models/festivalModel');

// Controller to get all festivals
exports.getFestivals = (req, res) => {
  try {
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving festivals', error: error.message });
  }
};