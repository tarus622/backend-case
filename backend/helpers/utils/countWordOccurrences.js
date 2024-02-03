module.exports = function countWordOccurrences(wordArray, targetWord) {
    const wordCount = wordArray.reduce((count, word) => {
        return count + (word === targetWord ? 1 : 0);
    }, 0);

    return wordCount;
}