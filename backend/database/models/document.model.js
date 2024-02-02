const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    file: { type: Buffer, required: true },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    accessLevel: { type: Number, required: true }
})

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;