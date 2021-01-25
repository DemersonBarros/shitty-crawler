/* eslint no-undef: off, no-underscore-dangle: off, implicit-arrow-linebreak: warn */
const fs = require('fs');
const DataBase = require('../../src/DataBase.js');
const URLNotStoredError = require('../../src/errors/database-errors/URLNotStoredError.js');

jest.mock('fs');
const db = new DataBase();

beforeEach(() => {
  fs.__setMockPath([]);
});

describe('getURL method', () => {
  test('should throw a TypeError because of URL', () => {
    let result;
    try {
      db.getURL(6);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('6 is not a string');
  });

  test('should throw a URLNotStoredError', () => {
    expect(() => {
      db.getURL('https://www.example.com');
    }).toThrow(URLNotStoredError);
  });

  test('should return the URL metadata', () => {
    fs.__setMockPath(['./data/wwwexamplecom']);
    fs.readFileSync = jest.fn(
      () =>
        '{"URL": "https://www.example.com", "metadata": {"content": "uwu"}}',
    );

    const result = db.getURL('https://www.example.com');
    const expectedResult = {
      URL: 'https://www.example.com',
      metadata: { content: 'uwu' },
    };

    expect(result).toEqual(expectedResult);
  });
});
