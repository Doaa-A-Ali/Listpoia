const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = []; // Store refresh tokens temporarily; consider using a persistent store in production.

const register = async (req, res) => {
    const { username, lastName, email, mobile, password, cpassword } = req.body;

    // Basic validation
    if (!username || !lastName || !email || !mobile || !password || !cpassword) {
        return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== cpassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            lastName,
            email,
            mobile,
            password: hashedPassword,
        });

        await newUser.save();

        // Respond with success message (do not include password in response)
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(401).json({ message: 'Unauthorized: Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log(`Password mismatch for user: ${email}`);
            return res.status(401).json({ message: 'Unauthorized: Invalid email or password' });
        }

        // Generate tokens
        const accessToken = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '30m' });
        const refreshToken = jwt.sign({ userId: user._id }, 'your_refresh_secret', { expiresIn: '7d' });

        refreshTokens.push(refreshToken); // Store refresh token
        res.json({ accessToken, refreshToken }); // Send both tokens
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
};

// Refresh token function
const refreshAccessToken = (req, res) => {
    const { token } = req.body;
    if (!token || !refreshTokens.includes(token)) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, 'your_refresh_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = jwt.sign({ userId: user.userId }, 'your_jwt_secret', { expiresIn: '30m' });
        res.json({ accessToken: newAccessToken });
    });
};
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login, refreshAccessToken,getCurrentUser};