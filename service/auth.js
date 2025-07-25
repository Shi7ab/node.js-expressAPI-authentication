// authService.js
const User = require('../models/userModels'); // Ensure the path is correct
const asyncHandler = require("../utils/asyncHandler");
const express = require('express');
const router = express.Router();    
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
// const apiError = require('../'); // Import custom error handler

const createToken = (payload) => {
   return jwt.sign({userid:payload}, process.env.JWT_SECRET, { expiresIn: '30d' });
}

exports.signup = asyncHandler(async (req, res,next) => {
    // create a new user
    try {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
   res.status(201).json({data:user, message: 'User created successfully'});
   // Generate a token for the user
    const token =  createToken(user._id);
    res.status(201).json({data:user, token});
    } catch (error) {
        return next(new Error('Error creating user: ' + error.message)); // Use your custom error handler
    }    
    next();
})

exports.login = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    // Check if user exists and password matches
    if(!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new Error('Invalid email or password')); // Use your custom error handler
    }
    // Generate a token for the user
    const token = createToken(user._id);
    res.status(200).json({data:user, token});
})

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    // Check if token is provided in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new Error('You are not logged in! Please log in to get access.')); // Use your custom error handler
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by ID from the token
    const currentUser = await User.findById(decoded.userid);
    if (!currentUser) {
        return next(new Error('The user belonging to this token does no longer exist.')); // Use your custom error handler
    }
      // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
})  

