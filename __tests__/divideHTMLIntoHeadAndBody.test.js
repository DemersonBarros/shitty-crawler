/* eslint no-undef: off */
const divideHTMLIntoHeadAndBody = require('../src/divideHTMLIntoHeadAndBody.js');

describe('divideHTMLIntoHeadAndBody.js', () => {
  test('should return an object containing the HTML body and head tag', () => {
    const HTML =
      '<head attribute=\'value\'>tons of tags</head> <body someattribute="somevalue">tons of tags</boDy>';
    const expectedResult = {
      head: "<head attribute='value'>tons of tags</head>",
      body: '<body someattribute="somevalue">tons of tags</boDy>',
    };
    const result = divideHTMLIntoHeadAndBody(HTML);

    expect(result).toEqual(expectedResult);
  });

  test('should throw a TypeError', () => {
    expect(() => {
      divideHTMLIntoHeadAndBody(47);
    }).toThrow(TypeError);
  });

  test('should return an object with the body and the head properties as an empty string', () => {
    const result = divideHTMLIntoHeadAndBody('<head>asdfasdf</BOdy>');
    const expectedResult = {
      head: '',
      body: '',
    };

    expect(result).toEqual(expectedResult);
  });

  test('should return just the body property as an empty string', () => {
    const result = divideHTMLIntoHeadAndBody(
      '<head>asdfasdf</HeaD> ainvalidhtml aadd</body>',
    );
    const expectedResult = {
      head: '<head>asdfasdf</HeaD>',
      body: '',
    };

    expect(result).toEqual(expectedResult);
  });

  test('should return just the head property as an empty string', () => {
    const result = divideHTMLIntoHeadAndBody(
      '<head some-attribute="value"> <bOdY someattribute="value"><H1>Text</h1></body>',
    );
    const expectedResult = {
      head: '',
      body: '<bOdY someattribute="value"><H1>Text</h1></body>',
    };

    expect(result).toEqual(expectedResult);
  });
});
