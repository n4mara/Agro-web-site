
require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth');
const pagesRoutes= require('./routes/pages.js');
const profileRoutes= require('./routes/profile');
const fieldsRoutes = require('./routes/fields.js');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cookieParser());

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/auth', authRoutes);
app.use('/api/user', profileRoutes);
app.use('/api/fields', fieldsRoutes);
app.use('/', pagesRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server запущено на http://localhost:${PORT}`);
});
