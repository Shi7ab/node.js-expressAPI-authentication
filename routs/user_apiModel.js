// Import the User model
const User = require('./userModel'); // تأكد أنك كتبت المسار صح

app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});
  