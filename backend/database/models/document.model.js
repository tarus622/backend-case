const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    file: { type: Buffer, required: true },
    filename: { type: String, required: true, unique: true },
    contentType: { type: String, required: true },
    accessLevel: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;