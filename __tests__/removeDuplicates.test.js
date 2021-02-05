/* eslint no-undef: off */
const removeDuplicates = require('../src/removeDuplicates.js');

describe('removeDuplicates.js', () => {
  test('should throw a TypeError because of array', () => {
    let result;
    try {
      removeDuplicates(5, 5);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('5 is not an Array');
  });

  test('should throw a TypeError because of number', () => {
    let result;
    try {
      removeDuplicates([], 0.5);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('0.5 is not a valid number');

    try {
      removeDuplicates([], -5);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('-5 is not a valid number');

    try {
      removeDuplicates([], '5');
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('5 is not a valid number');
  });

  test('should remove the duplicates from position 0', () => {
    const object = {};
    const objectDuplicate = {};
    const array = [
      object,
      objectDuplicate,
      1,
      1,
      1,
      1,
      1,
      'duplicate',
      'duplicate',
      'duplicate',
      undefined,
      undefined,
      null,
      null,
    ];

    removeDuplicates(array, 0);

    expect(array).toEqual([
      object,
      objectDuplicate,
      1,
      'duplicate',
      undefined,
      null,
    ]);
  });

  test('should remove the duplicates from position 3', () => {
    const array = [
      {},
      {},
      1,
      1,
      1,
      1,
      1,
      'duplicate',
      'duplicate',
      'duplicate',
      undefined,
      undefined,
      null,
      null,
    ];

    removeDuplicates(array, 3);

    expect(array).toEqual([{}, {}, 1, 1, 'duplicate', undefined, null]);
  });
});
