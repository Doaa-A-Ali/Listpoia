

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const groceryRoutes = require('./routes/groceries');
require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://anwarramo38:KtYuH4Ug56jcjV78@cluster0.z5s2h.mongodb.net/realstate'; // Fallback to local
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/groceries', groceryRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});