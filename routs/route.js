
const express = require('express');
const router = express.Router();

const User = require('../models/userModels'); // Import the User model
// const { DBconnection } = require('../config/db'); // Import the DB connection function
// DBconnection(); // Connect to the database
// Get all users
router.get('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,       // 1. ID from URL (e.g., /api/users/123)
      req.body,            // 2. New data to update (from frontend form)
      { new: true }        // 3. Return the updated user, not the old one
    );
    res.json(updatedUser); // 4. Send updated user back to the client
  } catch (err) {
    res.status(400).json({ message: err.message }); // 5. Handle error
  }
});