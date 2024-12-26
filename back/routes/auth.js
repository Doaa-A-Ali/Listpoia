// /routes/authRoutes.js
const express = require('express');
const { register, login, refreshAccessToken} = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();
const userController = require('../controllers/authController'); // Ensure the path is correct

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Token refresh route
router.post('/token', refreshAccessToken);
router.get('/me', authenticate, userController.getCurrentUser);


module.exports = router;