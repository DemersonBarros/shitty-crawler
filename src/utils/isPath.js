function isPath(url) {
  if (typeof url !== 'string') {
    throw new TypeError(`${url} is not a string`);
  }

  return /.+?\/\/.+?\/[^?].+?/.test(url);
}

module.exports = isPath;
