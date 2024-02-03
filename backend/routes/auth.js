const express = require('express');
const authUserController = require('../controllers/authUserController');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.get('/sign-in', authUserController.signIn);

router.use(errorHandler);

module.exports = router;