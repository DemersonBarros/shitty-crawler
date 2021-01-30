/* eslint no-unused-vars: off */
const { URL } = require('url');

function isURL(string) {
  let url;
  try {
    url = new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

function getURLsFromBody(siteURL = '', response = '') {
  if (typeof siteURL !== 'string') {
    throw new TypeError(`${siteURL} is not a string`);
  } else if (typeof response !== 'string') {
    throw new TypeError(`${response} is not a string`);
  }

  const parsedURL = siteURL.endsWith('/')
    ? siteURL.slice(0, siteURL.length - 1)
    : siteURL;
  const aElements = [
    ...response.matchAll(/<a .*?href=("|')(?<link>.*?)("|').*?>/gis),
  ];

  let oldLink = null;
  const links = [];

  aElements.forEach((aElement) => {
    const { link } = aElement.groups;

    if (
      link === '' ||
      link === oldLink ||
      link === parsedURL ||
      link === siteURL
    ) {
      return;
    }

    if (!isURL(link)) {
      oldLink = link;
      const newLink = link.startsWith('/') ? link : `/${link}`;
      links.push(`${parsedURL}${newLink}`);
      return;
    }

    links.push(link);
    oldLink = link;
  });

  return links;
}

module.exports = getURLsFromBody;
