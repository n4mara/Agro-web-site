const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fieldcontroller = require('../controllers/fields');
const { addField, getAllFields, getFieldById, updateField } = require('../controllers/fields');

router.get('/:id', auth, getFieldById);
router.put('/:id', auth, updateField);
router.post('/add', auth, addField);

router.get('/', auth, getAllFields);

module.exports = router;
