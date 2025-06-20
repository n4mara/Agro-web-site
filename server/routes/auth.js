// server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { create, findByEmail } = require('../models/user');
const router = express.Router();
const authcontroller = require('../controllers/auth');

router.post('/login',authcontroller.login);

router.post('/register', authcontroller.registration);

router.get('/token',authcontroller.token); 

module.exports = router;
