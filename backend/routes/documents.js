const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middlewares/authenticateToken');
const errorHandler = require('../middlewares/errorHandler');
const validateCreateDocument = require('../middlewares/validateCreateDocument')
const resetOutputDocuments = require('../middlewares/resetOutputDocuments');
const documentsController = require('../controllers/documentsController');
const router = express.Router();

const upload = multer({ dest: `${__dirname}/../../uploads` });

router.use(authenticateToken);
router.use(resetOutputDocuments);

router.get('/', documentsController.getDocuments)
router.get('/filename', documentsController.getDocumentsByName)
router.get('/date', documentsController.getDocumentsByDate)
router.get('/word', documentsController.getDocumentsByKeyword)
router.post('/', upload.single('file'), validateCreateDocument, documentsController.uploadDocument)
router.put('/:id', upload.single('file'), validateCreateDocument, documentsController.updateDocument)
router.delete('/:id', documentsController.deleteDocument)

router.use(errorHandler);

module.exports = router;