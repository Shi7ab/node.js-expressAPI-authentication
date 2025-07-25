// app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); // For logging requests
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require("./midelware/errorhandel")
const DBconnection = require('./config/db'); // Import the DB connection
// const rateLimit = require('express-rate-limit') // Import rate limiter middleware 
const authRoutes = require('./routs/authRoute'); // Import auth routes
dotenv.config(); // Load environment variables from .env file
const app = express();

// Use error handler (MUST be after routes)
app.use(errorHandler);


DBconnection()
 
if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // Log requests in development mode
}

app.use(express.json());

app.use(cors()); // 👈 هذا مهم علشان React يقدر يتواصل مع Express

app.use('/api/auth', authRoutes)
 

 
const userRoutes = require('./routs/user'); // تأكد أنك كتبت المسار صح
app.use('/api/users', userRoutes); // استخدم المسار المناسب حسب تصميمك
 
 
// Import the User model
const User = require('./models/userModels'); // تأكد أنك كتبت المسار صح



const path = require('path');

app.use(express.static(__dirname)); // يقدم ملفات HTML مباشرة


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

       
 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
