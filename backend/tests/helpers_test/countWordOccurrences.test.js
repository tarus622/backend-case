const countWordOccurrences = require('../../helpers/utils/countWordOccurrences');

describe('countWordOccurrences(array, word)', () => {
    it('should count the number of times that a giver word appears in the array provided', () => {
        // Arrange
        const array = ['galinha', 'gorila', 'tartaruga', 'tartaruga', 'tartaruga', 'gorila'];
        const word = 'tartaruga';

        // Act
        const result = countWordOccurrences(array, word);

        // Assert
        expect(result).toBe(3);
    })

    it('should return 0 if targetWord is not in the array', () => {
        // Arrange
        const result = countWordOccurrences(['word1', 'word2', 'word3'], 'target');

        // Assert
        expect(result).toBe(0);
    })

    it('should handle case-sensitive matching', () => {
        // Arrange
        const wordArray = ['Word1', 'word2', 'word1', 'word3'];

        // Act
        const result = countWordOccurrences(wordArray, 'word1');

        // Assert
        expect(result).toBe(2);
    });
})