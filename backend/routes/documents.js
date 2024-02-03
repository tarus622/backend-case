const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middlewares/authenticateToken');
const documentsController = require('../controllers/documentsController');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

const upload = multer({ dest: '../uploads' });

router.get('/', authenticateToken, documentsController.getDocuments)
router.get('/filename', authenticateToken, documentsController.getDocumentsByName)
router.get('/date', authenticateToken, documentsController.getDocumentsByDate)
router.post('/', authenticateToken, upload.single('file'), documentsController.uploadDocument)

router.use(errorHandler);

module.exports = router;