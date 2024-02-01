const express = require('express');
const validationSignUp = require('../middlewares/validationSignUp');
const authMiddlewares = require('../middlewares/authMiddlewares');
const authController = require('../controllers/authConroller');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.get('/sign-in', authController.signIn);

router.use(errorHandler);

module.exports = router;