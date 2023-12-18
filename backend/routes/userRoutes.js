const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.get('/userinfo/:_id', userController.getUserInfo);
router.post('/addQuizScore', userController.addQuizScore);
router.post('/register', upload.single('profilePic'), userController.register);

module.exports = router;
