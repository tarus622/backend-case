const natural = requier('natural');

module.exports = async function analizeText(text) {
    // Tokenizing and stemming
    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;

    // Tokenize the text
    const tokens = tokenizer.tokenize(text);

    // Perform stemming on tokens
    const stemmedTokens = tokens.map(token => stemmer.stem(token));
}