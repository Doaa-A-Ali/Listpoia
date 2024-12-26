const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

router.get('/', festivalController.getFestivals);

module.exports = router;