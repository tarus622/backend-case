const analyzeDocument = require('./utils/analyzeDocument');
const countWordOccurrences = require('./utils/countWordOccurrences');

module.exports = async function documentsFilter(documents, word) {
    try {
        const documentsFiltered = [];

        await Promise.all(documents.map(async document => {
            const { originalTokens } = await analyzeDocument(document);
            const wordCount = countWordOccurrences(originalTokens, word);

            if (wordCount > 0)
                documentsFiltered.push([document, wordCount]);
        }))

        if (documentsFiltered.length === 0) throw new Error('No documents containing the given word was found')

        const sortedDocumentsArray = documentsFiltered.sort((a, b) => b[1] - a[1]);

        return sortedDocumentsArray;
    } catch (error) {
        throw error;
    }
} 