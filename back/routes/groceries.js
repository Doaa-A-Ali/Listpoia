const express = require('express');
const jwt = require('jsonwebtoken');
const Grocery = require('../models/grocery');
const router = express.Router();

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Incoming Token:', token); // Log incoming token
    if (token) {
        const actualToken = token.split(' ')[1]; // Extract the actual token
        jwt.verify(actualToken, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err.message); // Log the error
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.userId = decoded.userId; // Set the userId from the token
            console.log('Decoded User ID:', req.userId); // Log the decoded user ID
            next();
        });
    } else {
        console.error('No token provided');
        res.sendStatus(403);
    }
};

// Get user groceries
router.get('/', authenticate, async (req, res) => {
    try {
        const groceries = await Grocery.find({ userId: req.userId });
        res.json(groceries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new grocery
router.post('/', authenticate, async (req, res) => {
    const { name, quantity, category,buyDate  } = req.body;

    const grocery = new Grocery({
        name,
        quantity,
        category,
        userId: req.userId,
        buyDate 
    });

    try {
        const newGrocery = await grocery.save();
        res.status(201).json(newGrocery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a grocery
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const grocery = await Grocery.findOne({ _id: req.params.id, userId: req.userId });
        if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

        if (req.body.name) grocery.name = req.body.name;
        if (req.body.quantity) grocery.quantity = req.body.quantity;
        if (req.body.category) grocery.category = req.body.category;
        if (req.body.buyDate ) grocery.buyDate  = req.body.buyDate ;

        const updatedGrocery = await grocery.save();
        res.json(updatedGrocery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a grocery
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const grocery = await Grocery.findOne({ _id: req.params.id, userId: req.userId });
        if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

        await Grocery.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reorder groceries (this assumes an array of ids to reorder)
// router.patch('/reorder', authenticate, async (req, res) => {
//     const { fromIndex, toIndex } = req.body;
//     try {
//         const groceries = await Grocery.find({ userId: req.userId });

//         if (fromIndex < 0 || toIndex < 0 || fromIndex >= groceries.length || toIndex >= groceries.length) {
//             return res.status(400).json({ message: 'Invalid indices' });
//         }

//         const [movedGrocery] = groceries.splice(fromIndex, 1);
//         groceries.splice(toIndex, 0, movedGrocery);
        
//         // Update the order in database (optional: you may want to manage a specific order field)
//         await Grocery.deleteMany({ userId: req.userId }); // Clear the user's groceries
//         await Grocery.insertMany(groceries); // Reinsert in new order
//         res.json(groceries);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
router.patch('/reorder', authenticate, async (req, res) => {
    const { fromIndex, toIndex } = req.body;

    try {
        // Fetch groceries for the authenticated user
        const groceries = await Grocery.find({ userId: req.userId });

        // Validate indices
        if (fromIndex < 0 || toIndex < 0 || fromIndex >= groceries.length || toIndex >= groceries.length) {
            return res.status(400).json({ message: 'Invalid indices' });
        }

        // Remove the grocery from the original position
        const [movedGrocery] = groceries.splice(fromIndex, 1);
        // Insert it at the new position
        groceries.splice(toIndex, 0, movedGrocery);

        // Update the order of each grocery item in the database
        const updatePromises = groceries.map((grocery, index) => {
            return Grocery.findByIdAndUpdate(grocery._id, { orderIndex: index }); // Assuming you have an 'orderIndex' field
        });

        await Promise.all(updatePromises); // Wait for all updates to finish

        res.json(groceries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;