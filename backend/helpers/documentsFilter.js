const analyzeDocument = require('./utils/analyzeDocument');
const countWordOccurrences = require('./utils/countWordOccurrences');

module.exports = async function documentsFilter(documents, word) {
    const documentsFiltered = [];

    await Promise.all(documents.map(async document => {
        const { originalTokens } = await analyzeDocument(document);
        const wordCount = countWordOccurrences(originalTokens, word);

        if (wordCount > 0)
            documentsFiltered.push([document, wordCount]);
    }))

    const sortedDocumentsArray = documentsFiltered.sort((a, b) => b[1] - a[1]);

    return sortedDocumentsArray;
} 