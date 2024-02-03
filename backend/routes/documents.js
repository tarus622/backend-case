const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middlewares/authenticateToken');
const errorHandler = require('../middlewares/errorHandler');
const resetOutputDocuments = require('../middlewares/resetOutputDocuments');
const documentsController = require('../controllers/documentsController');
const router = express.Router();

const upload = multer({ dest: `../uploads` });

router.use(authenticateToken);
router.use(resetOutputDocuments);

router.get('/', documentsController.getDocuments)
router.get('/filename', documentsController.getDocumentsByName)
router.get('/date', documentsController.getDocumentsByDate)
router.post('/', upload.single('file'), documentsController.uploadDocument)

router.use(errorHandler);

module.exports = router;