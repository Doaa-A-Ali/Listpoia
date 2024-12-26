const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });

const Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;