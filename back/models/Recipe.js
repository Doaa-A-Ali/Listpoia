// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    prepTime: String,
    cookTime: String,
    totalTime: String,
    servings: Number,
    spiceMix: [String],
    dish: [String],
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;