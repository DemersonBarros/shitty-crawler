/* eslint no-undef: off, no-underscore-dangle: off */
const fs = require('fs');
const DataBase = require('../../src/DataBase.js');

jest.mock('fs');
const db = new DataBase();

beforeEach(() => {
  fs.__setMockPath([]);
});

describe('addPath method', () => {
  test('should throw a TypeError because of path', () => {
    let result;
    try {
      db.addPath(5, {}, 'https://www.example.com');
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('5 is not a string');
  });

  test('should throw a TypeError because of pathMetaData', () => {
    let result;
    try {
      db.addPath('/path/to/file.html', '', 'https://www.example.com');
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe(' is not a object');
  });

  test('should throw a TypeError because of parentURL', () => {
    let result;
    try {
      db.addPath('/path/to/file.html', {}, []);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe(' is not a string');
  });

  test('should not add the path to the database', () => {
    fs.__setMockPath(['./data/wwwexamplecom/pathtofilehtml']);
    const result = db.addPath(
      '/path/to/file.html',
      { content: 'uwu' },
      'https://www.example.com/',
    );

    expect(result).toBeUndefined();
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  test('should add the path to the database', () => {
    const result = db.addPath(
      '/path/to/file.html',
      { content: 'uwu' },
      'https://www.example.com/',
    );

    expect(result).toBeUndefined();
    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
