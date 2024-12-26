const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/GroscrtyControllers');

// Public route to get all groceries
router.get('/public-groceries', groceryController.getPublicGroceries);


module.exports = router;