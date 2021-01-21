/* eslint no-undef: off */
const getURLFolderName = require('../../src/utils/getURLFolderName.js');

describe('getURLFolderName.js', () => {
  describe('should return the folder name:', () => {
    test('wwwexamplecom', () => {
      const result = getURLFolderName('http://www.example.com/');

      expect(result).toBe('wwwexamplecom');
    });

    test('some-domaincom', () => {
      const result = getURLFolderName('https://some-domain.com/');

      expect(result).toBe('some-domaincom');
    });
  });
});
