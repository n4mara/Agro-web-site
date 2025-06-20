const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const path = require('path');

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/about.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/login.html'));
});
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/registration.html'));
});
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/profile.html'));
});
router.get('/add_field',(req, res) => {
    res.sendFile(path.join(__dirname, '../../client/add_field.html'));
});

module.exports = router;