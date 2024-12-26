// controllers/recipeController.js
const Recipe = require('../models/Recipe');

// Get all recipes
exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes); // Return JSON response for API
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};