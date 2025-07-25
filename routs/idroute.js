/*const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
// const Item = require('../models/Item');
// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const item = await User.findById(req.params.id);
    if (!User) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//exports = router;
module.exports = router; // Uncomment this line if you want to export the router for use
*/