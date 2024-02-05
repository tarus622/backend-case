const natural = require('natural');

module.exports = async function analyzeText(text) {
    try {
        const tokenizer = new natural.WordTokenizer();
        const stemmer = natural.PorterStemmer;

        const tokens = tokenizer.tokenize(text);
        const stemmedTokens = tokens.map(token => stemmer.stem(token));

        return {
            originalTokens: tokens,
            stemmedTokens: stemmedTokens,
        };
    } catch (error) {
        throw new Error(`Error during text analysis: ${error.message}`);
    }
};
