/* eslint no-undef: off */
const getCharacterPositionsFromString = require('../../src/utils/getCharacterPositionsFromString.js');

describe('getCharacterPositionsFromString.js', () => {
  describe('should return an array with the values:', () => {
    test('3, 7', () => {
      const result = getCharacterPositionsFromString(
        'h',
        'We had ham for dinner',
      );
      expect(result.length).toBe(2);
      expect(result).toContain(3);
      expect(result).toContain(7);
    });

    test('4, 6', () => {
      const result = getCharacterPositionsFromString(
        'a',
        'Can I play your guitar?',
      );
      expect(result.length).toBe(3);
      expect(result).toContain(1);
      expect(result).toContain(8);
      expect(result).toContain(20);
    });
  });
});
