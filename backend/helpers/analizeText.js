const natural = requier('natural');
const extractTextFromPDF = require('../helpers/')

module.exports = async function analizeText(text) {
    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;

    const tokens = tokenizer.tokenize(text);

    const stemmedTokens = tokens.map(token => stemmer.stem(token));
}