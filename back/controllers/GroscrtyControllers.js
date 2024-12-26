const GroceryPublic = require('../models/GroceryPublic'); // Import the public grocery model

exports.getPublicGroceries = async (req, res) => {
    try {
        const groceries = await GroceryPublic.find(); // Fetch all public grocery items
        res.json(groceries);
    } catch (error) {
        console.error('Error fetching public groceries:', error);
        res.status(500).json({ message: 'Error fetching public groceries' });
    }
};

