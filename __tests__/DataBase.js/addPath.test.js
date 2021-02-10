/* eslint no-undef: off, no-underscore-dangle: off */
const fs = require('fs');
const DataBase = require('../../src/DataBase.js');

jest.mock('fs');
const db = new DataBase();

beforeEach(() => {
  fs.__setMockPath(['./data']);
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
    fs.__setMockPath(['./data/wwwexamplecom']);

    const results = [
      db.addPath(
        'path/to/file.html',
        { content: 'uwu' },
        'https://www.example.com',
      ),
      db.addPath(
        '/path/to/file.html',
        { content: 'uwu' },
        'https://www.example.com/',
      ),
      db.addPath(
        '/path/to/file.html',
        { content: 'uwu' },
        'https://www.example.com',
      ),
      db.addPath(
        'path/to/file.html',
        { content: 'uwu' },
        'https://www.example.com/',
      ),
    ];

    for (let i = 0; i < 4; i += 1) {
      const result = results[0];
      expect(result).toBeUndefined();
      expect(fs.mkdirSync).toHaveBeenNthCalledWith(
        i + 1,
        './data/wwwexamplecom/pathtofilehtml',
        {
          recursive: true,
        },
      );
      if (i % 2 !== 0) {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
          i + 1,
          './data/wwwexamplecom/pathtofilehtml/metadata.json',
          JSON.stringify({
            parentURL: 'https://www.example.com/',
            fullURL: 'https://www.example.com/path/to/file.html',
            metadata: { content: 'uwu' },
          }),
        );
      } else {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
          i + 1,
          './data/wwwexamplecom/pathtofilehtml/metadata.json',
          JSON.stringify({
            parentURL: 'https://www.example.com',
            fullURL: 'https://www.example.com/path/to/file.html',
            metadata: { content: 'uwu' },
          }),
        );
      }
    }
  });
});
