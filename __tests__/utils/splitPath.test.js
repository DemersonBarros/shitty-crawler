/* eslint no-undef: off */
const splitPath = require('../../src/utils/splitPath.js');

describe('splitPath.js', () => {
  test('should throw a TypeError', () => {
    expect(() => {
      splitPath(7);
    }).toThrow(TypeError);
  });

  test('should return the splitted path', () => {
    const result = splitPath(
      'http://4some.biz.uk/thingishappening-yeah?q=query',
    );
    expect(result).toEqual({
      parentURL: 'http://4some.biz.uk',
      path: 'thingishappening-yeah',
    });
  });
});
