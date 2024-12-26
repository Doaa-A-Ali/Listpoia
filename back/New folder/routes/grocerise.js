// routes/groceries.js
const express = require('express');
const router = express.Router();
const Grocery = require('../models/Grocery');

// Get all groceries
router.get('/', async (req, res) => {
    try {
        const groceries = await Grocery.find();
        res.json(groceries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new grocery
router.post('/', async (req, res) => {
    const grocery = new Grocery({
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
    });

    try {
        const newGrocery = await grocery.save();
        res.status(201).json(newGrocery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a grocery
router.patch('/:id', async (req, res) => {
    try {
        const grocery = await Grocery.findById(req.params.id);
        if (req.body.name) grocery.name = req.body.name;
        if (req.body.quantity) grocery.quantity = req.body.quantity;
        if (req.body.category) grocery.category = req.body.category;

        const updatedGrocery = await grocery.save();
        res.json(updatedGrocery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a grocery
router.delete('/:id', async (req, res) => {
    try {
        await Grocery.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reorder groceries (this assumes an array of ids to reorder)
router.patch('/reorder', async (req, res) => {
    const { fromIndex, toIndex } = req.body;
    try {
        const groceries = await Grocery.find();
        const [movedGrocery] = groceries.splice(fromIndex, 1);
        groceries.splice(toIndex, 0, movedGrocery);
        
        // Save the new order (you might want to set a specific order field)
        await Grocery.deleteMany({}); // Clear the collection for simplicity
        await Grocery.insertMany(groceries); // Reinsert in new order
        res.json(groceries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;