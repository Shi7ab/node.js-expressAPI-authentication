const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Assuming you have a User model defined in models/User
const app = express();
require('dotenv').config(); // Load environment variables from .env file
app.use(express.json());
app.use(cors()); // Enable CORS to allow requests from React app
// Connect to MongoDB 



// dispay data from database
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
