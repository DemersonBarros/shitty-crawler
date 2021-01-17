/* eslint no-unused-vars: off */

const isValidDomain = require('is-valid-domain');
const NoURLError = require('./errors/URL-errors/NoURLError.js');
const NotAValidURLError = require('./errors/URL-errors/NotAValidURLError.js');

function isURL(string) {
  let url;
  try {
    url = new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

function getUserURLS() {
  const processStdin = process.argv;
  processStdin.splice(0, 2);
  const urls = new Set(processStdin);
  if (urls.size === 0) {
    throw new NoURLError('Did not receive an URL.');
  }
  processStdin.forEach((url) => {
    if (isValidDomain(url)) {
      urls.delete(url);
      urls.add(`http://${url}`);
      urls.add(`https://${url}`);
    } else if (!isURL(url)) {
      throw new NotAValidURLError(`${url} is not a valid URL.`);
    }
  });
  return urls;
}

module.exports = getUserURLS;
