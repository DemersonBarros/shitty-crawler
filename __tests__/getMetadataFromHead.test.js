/* eslint no-undef: off */
const getMetadataFromHead = require('../src/getMetadataFromHead.js');

describe('getMetadaFromHead.js', () => {
  test('should return the metadata', () => {
    const head =
      '<head><meta HTTP-equiv="Content-Type" content="text/html; charset=utf-8"><meta chARsEt="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"><meta property="og:image" content="https://www.example.com/file.png"></head>';
    const expectedResult = {
      charset: 'utf-8',
      viewport:
        'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover',
      'og:image': 'https://www.example.com/file.png',
    };
    const result = getMetadataFromHead(head);

    expect(result).toEqual(expectedResult);
  });

  test('should return nothing', () => {
    const head =
      '<head><meta HTTP-equiv="Content-Type" content="text/html; charset=utf-8">asdfsadf<meta content=\'some content\'><meta ></head>';
    const result = getMetadataFromHead(head);

    expect(result).toEqual({});
  });

  test('should return a TypeError', () => {
    expect(() => {
      getMetadataFromHead([]);
    }).toThrow(TypeError);
  });
});
