const WordExtractor = require("word-extractor");

module.exports = async function extractDocxObject(document) {
    const extractor = new WordExtractor();
    const wordObject = await extractor.extract(document.file);

    return wordObject;
}