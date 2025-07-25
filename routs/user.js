const express = require('express');
const router = express.Router();
const User = require('../models/userModels'); // افترض أن عندك موديل اسمه User
const asyncHandler = require("../utils/asyncHandler")

// CRUD Routes for User

// ✅ Create a user
router.post('/', asyncHandler(async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created', user: savedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}));

// ✅ Get all users
router.get('/', asyncHandler(async (req, res,next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error); // Pass the error to the error handler middleware
  }
}));

// ✅ Get user by ID
router.get('/:id', asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));

// ✅ Update user by ID
router.put('/:id',asyncHandler( async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}));

// ✅ Delete user by ID
router.delete('/:id', asyncHandler(async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));

module.exports = router;

