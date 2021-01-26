/* eslint no-undef: off */
const getURLsFromSiteResponseBody = require('../src/getURLsFromSiteResponseBody.js');

describe('getURLsFromSiteResponseBody.js', () => {
  test('should return a TypeError because of siteURL', () => {
    let result;
    try {
      getURLsFromSiteResponseBody(465, '<html><html/>');
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe('465 is not a string');
  });

  test('should return a TypeError because of response', () => {
    let result;
    try {
      getURLsFromSiteResponseBody('https://www.example.com', []);
    } catch (error) {
      result = error;
    }

    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe(' is not a string');
  });

  test('should return the URLs on the site', () => {
    // prettier-ignore
    const response = '<a anotherAtrribute="attributevalue" href=""><a/> <a href=\'/açldsfsalç\'><a/><a href=\'/açldsfsalç\'><a/><a href=\'http://2.example.com/path\'><a href=\'http://1.example.com/\'> <a href=\'http://1.example.com/path\'><a/>';
    const result = getURLsFromSiteResponseBody(
      'https://www.example.com/',
      response,
    );

    expect(result.length).toBe(4);
    expect(result.includes('https://www.example.com/açldsfsalç')).toBeTruthy();
    expect(result.includes('http://2.example.com/path')).toBeTruthy();
    expect(result.includes('http://1.example.com/')).toBeTruthy();
    expect(result.includes('http://1.example.com/path')).toBeTruthy();
  });

  test('should return an empty array', () => {
    const response = '<a href=""><a/> <a href="https://www.example.com"><a/>';
    const result = getURLsFromSiteResponseBody(
      'https://www.example.com/',
      response,
    );

    expect(result.length).toBe(0);
  });
});
