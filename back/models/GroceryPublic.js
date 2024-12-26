const mongoose = require('mongoose');

const groceryPublicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Beverages'] },
    image: { type: String, required: true } 
});

const GroceryPublic = mongoose.models.GroceryPublic || mongoose.model('GroceryPublic', groceryPublicSchema);

module.exports = GroceryPublic;