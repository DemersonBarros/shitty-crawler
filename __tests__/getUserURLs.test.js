/* eslint no-undef: off */
const NoURLError = require('../src/errors/URL-errors/NoURLError.js');
const NotAValidURLError = require('../src/errors/URL-errors/NotAValidURLError.js');
const getUserURLs = require('../src/getUserURLs.js');

const oldProcessArgv = process.argv.slice(0, 2);
beforeEach(() => {
  process.argv = [...oldProcessArgv];
});

describe('getUserURLs.js', () => {
  test("should return the user's urls", () => {
    process.argv.push('www.example.com', 'https://www.notexample.com');
    const result = getUserURLs();

    expect(result.length).toBe(3);
    expect(result.includes('https://www.notexample.com')).toBeTruthy();
    expect(result.includes('https://www.example.com')).toBeTruthy();
    expect(result.includes('http://www.example.com')).toBeTruthy();
  });

  test('should throw a NoURLError', () => {
    expect(getUserURLs).toThrow(NoURLError);
  });

  test('should throw a NotAValidURLError', () => {
    process.argv.push(
      'not a url',
      'random thing being typed lol',
      'what are reading this want to know how a test works?',
    );
    expect(() => {
      getUserURLs();
    }).toThrow(NotAValidURLError);
  });
});
