// // /middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.sendStatus(401);
//     jwt.verify(token, 'your_jwt_secret', (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;
// /middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, 'your_jwt_secret', async (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid

        try {
            // Fetch the user from the database using the ID from the token
            req.user = await User.findById(user.id).select('-password'); // Exclude password
            if (!req.user) return res.sendStatus(404); // Not Found if user doesn't exist
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.sendStatus(500); // Internal Server Error
        }
    });
};

module.exports = authenticateToken;