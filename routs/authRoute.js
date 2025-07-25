// authRouter.js
const authController = require('../service/auth') // Import the signup and login functions // Import async handler for error handling
/*const {
  signupValidator,
  loginValidator,
} = require('../utils/validator/authValidator');*/ // Import the validation middleware

const express = require('express');
const router = express.Router(); // ✅ هذا الصحيح

// Define the signup route
router.post('/signup', authController.signup); // Use asyncHandler to handle errors
// Define the login route
router.post('/login', authController.login); // Use asyncHandler to handle errors

module.exports = router;
