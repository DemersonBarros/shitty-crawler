/* eslint no-undef: off, no-underscore-dangle: off, implicit-arrow-linebreak: warn */
const fs = require('fs');
const DataBase = require('../../src/DataBase.js');
const PathNotStoredError = require('../../src/errors/database-errors/PathNotStoredError.js');
const URLNotStoredError = require('../../src/errors/database-errors/URLNotStoredError.js');

jest.mock('fs');
const db = new DataBase();

beforeEach(() => {
  fs.__setMockPath(['./data']);
});

describe('getPath method', () => {
  test('should throw a TypeError because of path', () => {
    let result;
    try {
      db.getPath(6, 'https://www.parentURL.com');
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('6 is not a string');
  });

  test('should throw a TypeError because of parentURL', () => {
    let result;
    try {
      db.getPath('path/to/file.html', { "it's not a string": true });
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('[object Object] is not a string');
  });

  test('should throw a PathNotStoredError', () => {
    fs.__setMockPath(['./data/wwwexamplecom']);

    expect(() => {
      db.getPath('/path/to/file.html', 'http://www.example.com');
    }).toThrow(PathNotStoredError);
  });

  test('should throw a URLNotStoredError', () => {
    expect(() => {
      db.getPath('/path/to/file.html', 'http://www.example.com');
    }).toThrow(URLNotStoredError);
  });

  test('should return the path metadata', () => {
    fs.__setMockPath(['./data/wwwexamplecom/pathtofilephp']);
    fs.readFileSync = jest.fn(
      () =>
        '{"URL": "https://www.example.com/path/to/file.php", "metadata": {"content": "uwu"}}',
    );

    const result = db.getPath('/path/to/file.php', 'https://www.example.com/');
    const expectedResult = {
      URL: 'https://www.example.com/path/to/file.php',
      metadata: { content: 'uwu' },
    };

    expect(result).toEqual(expectedResult);
  });
});
