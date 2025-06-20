const express = require("express");
const router = express.Router();
const profilecontroller = require('../controllers/profile');
const auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

router.post('/avatar', auth, upload.single('avatar'), profilecontroller.uploadAvatar);
router.get('/avatar/:id', profilecontroller.getAvatar);
router.get('/name/:id', profilecontroller.getName);
module.exports = router;