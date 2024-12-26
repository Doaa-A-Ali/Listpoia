// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to get all recipes
router.get('/api/recipe', recipeController.getRecipes); // Ensure this matches the URL you use in React

module.exports = router;