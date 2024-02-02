const express = require('express');
const multer = require('multer');
const authMiddlewares = require('../middlewares/authMiddlewares');
const documentsController = require('../controllers/documentsController');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

const upload = multer({ dest: '../uploads' });

router.get('/', authMiddlewares.authenticateToken, documentsController.getDocuments)
router.post('/', authMiddlewares.authenticateToken, upload.single('file'), documentsController.uploadDocument)

router.use(errorHandler);

module.exports = router;