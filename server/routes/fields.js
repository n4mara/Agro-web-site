const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fieldcontroller = require('../controllers/fields');

router.post('/add', auth, fieldcontroller.addField);

module.exports = router;
