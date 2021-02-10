/* eslint no-undef: off, no-underscore-dangle: off, implicit-arrow-linebreak: warn */
const fs = require('fs');
const DataBase = require('../../src/DataBase.js');

jest.mock('fs');
const db = new DataBase();

beforeEach(() => {
  fs.__setMockPath(['./data']);
});

describe('includes method', () => {
  test('should throw a TypeError', () => {
    expect(() => {
      db.includes(5);
    }).toThrow(TypeError);
  });

  test('should return true', () => {
    fs.__setMockPath([
      './data/wwwexamplecom/pathtofilehtml',
      './data/1examplecom/',
    ]);

    expect(
      db.includes('https://www.example.com/path/to/file.html'),
    ).toBeTruthy();
    expect(db.includes('https://www.example.com/')).toBeTruthy();
    expect(db.includes('https://www.example.com')).toBeTruthy();
    expect(db.includes('http://1.example.com'));
  });

  test('should return false', () => {
    expect(
      db.includes('https://www.example.com/path/to/file.html'),
    ).toBeFalsy();
    expect(db.includes('https://www.example.com/')).toBeFalsy();
    expect(db.includes('https://www.example.com')).toBeFalsy();
  });
});
