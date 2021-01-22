/* eslint no-undef: off */
const getPathFolderName = require('../../src/utils/getPathFolderName.js');

describe('getPathFolderName.js', () => {
  describe('should return the folder name:', () => {
    test('pathtofilehtml', () => {
      const result = getPathFolderName('/path/to/file.html');

      expect(result).toBe('pathtofilehtml');
    });

    test('somethingq words ', () => {
      const result = getPathFolderName('/something?q=%20words%20');

      expect(result).toBe('somethingq words ');
    });
  });
});
