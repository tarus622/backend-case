const express = require('express');
const validationSignUp = require('../middlewares/validationSignUp');
const usersController = require('../controllers/usersController');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.get('/', usersController.findUsers);
router.get('/user', usersController.findUser);
router.post('/', validationSignUp, usersController.create);
router.patch('/', usersController.editPassword);
router.delete('/', usersController.deleteUser);

router.use(errorHandler);

module.exports = router;
