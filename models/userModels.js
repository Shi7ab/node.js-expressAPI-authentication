// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email:{
     type: String,
      required: true,
      unique: true, // Ensure email is unique
      lowercase: true, // Store email in lowercase   
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6, // Minimum password length 
  }
});

// module.exports = mongoose.model('User', userSchema);
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  // Hash the password before saving
  this.password = await bcrypt.hash(this.password,12);
  next();
}) 

const User = mongoose.model('User', userSchema);

module.exports = User;
