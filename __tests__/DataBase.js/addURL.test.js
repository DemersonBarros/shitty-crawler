/* eslint no-undef: off, no-underscore-dangle: off */
const fs = require('fs');
const DataBase = require('../../src/DataBase.js');
const getURLFolderName = require('../../src/utils/getURLFolderName.js');

jest.mock('fs');
const db = new DataBase();

beforeEach(() => {
  fs.__setMockPath(['./data']);
});

describe('addURL method', () => {
  test('should return a TypeError because of the URL', () => {
    let result;
    try {
      db.addURL([], {});
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe(' is not a string');
  });

  test('should return a TypeError because of the URLMetaData', () => {
    let result;
    try {
      db.addURL('https://www.example.com', undefined);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('undefined is not a object');
  });

  test('should not add the URL to the database', () => {
    fs.__setMockPath(['./data/wwwexamplecom']);
    db.addURL('https://www.example.com', { data: 'uwu' });
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  test('should add the URL to the database', () => {
    const URL = 'https://www.example.com';
    const data = { data: 'uwu' };
    db.addURL(URL, data);
    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `${db.dir}/${getURLFolderName(URL)}/metadata.json`,
      JSON.stringify({ URL, metadata: data }),
    );
  });
});
