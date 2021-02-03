/* eslint no-undef: off */
const isPath = require('../../src/utils/isPath.js');

describe('isPath.js', () => {
  test('should throw a TypeError', () => {
    expect(() => {
      isPath([]);
    }).toThrow(TypeError);
  });

  test('should return true', () => {
    expect(isPath('https://www.example.com/path/to/file/')).toBeTruthy();
    expect(isPath('https://www.example.com/path/to')).toBeTruthy();
    expect(isPath('https://www.example.com/query?q=query')).toBeTruthy();
  });

  test('should return false', () => {
    expect(isPath('https://www.example.com/')).toBeFalsy();
    expect(isPath('https://www.example.com')).toBeFalsy();
    expect(isPath('https://www.example.com/?q=search')).toBeFalsy();
  });
});
