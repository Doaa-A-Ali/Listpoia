// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure this is correct
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    profileImage: { type: String, default: 'https://i.pinimg.com/736x/4d/ec/c4/4decc4d8f83566446a4b085a69c40865.jpg' } // Default image

});

const User = mongoose.model('User', userSchema);

module.exports = User;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFud2EyMjFyQGdtYWlsLmNvbSIsImlhdCI6MTczMjU2NzUwNCwiZXhwIjoxNzMyNTcxMTA0fQ.63t_GybnrVG1eJFaB6jBB487mSuc9nmvXqtu8y8V51c"