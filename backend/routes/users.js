const express = require('express');
const authController = require('../controllers/authController')
const usersController = require('../controllers/usersController');
const router = express.Router();

router.post('/', usersController.create);
router.post('/auth', authController.signIn);
router.get('/admin')

module.exports = router;
