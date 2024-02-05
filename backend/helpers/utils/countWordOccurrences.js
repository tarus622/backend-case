module.exports = function countWordOccurrences(wordArray, targetWord) {
    const wordCount = wordArray.reduce((count, word) => {
        const lowerTargetWord = targetWord.toLowerCase();
        const lowerWord = word.toLowerCase();
        return count + (lowerWord === lowerTargetWord ? 1 : 0);
    }, 0);
    return wordCount;
}