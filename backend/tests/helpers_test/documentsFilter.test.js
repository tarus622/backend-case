const documentsFilter = require('../../helpers/documentsFilter');

jest.mock('../../helpers/utils/analyzeDocument', () => {
    return jest.fn().mockImplementation((text) => {
        return { originalTokens: text.split(' ') };
    });
});

describe('documentsFilter(documents, word)', () => {
    it('should filter documents based on word occurrences and return sorted array', async () => {
        // Arrange
        const documents = [
            'This is a document with target word.',
            'Another document with the target word.',
            'Target word appears multiple times in this document with target word.'
        ];
        const word = 'target';

        // Act
        const result = await documentsFilter(documents, word);

        // Assert
        expect(result).toEqual([
            ['This is a document with target word.', 1],
            ['Another document with the target word.', 1],
            ['Target word appears multiple times in this document with target word.', 2]
        ].sort((a, b) => b[1] - a[1]));
    });

    it('should throw an error if an empty array of documents is provided', async () => {
        // Arrange
        const documents = [];
        const word = 'target';

        // Act and Assert
        await expect(documentsFilter(documents, word)).rejects.toThrow('No documents containing the given word was found');
    });

    it('should generate an error if the given word does not exist in any of the documents', async () => {
        // Arrange
        const documents = [
            'This is a document with target word.',
            'Another document with the target word.',
            'Target word appears multiple times in this document with target word.'
        ];
        const word = 'asdfsadfsadf';

        // Act and Assert
        await expect(documentsFilter(documents, word)).rejects.toThrow('No documents containing the given word was found');
    });
});
