function splitPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError(`${path} is not a string`);
  }

  const splittedPath = {};
  const pathMatch = path.match(/(?<parentURL>.+?\/\/.+?)\/(?<path>[^?]*)/);
  splittedPath.parentURL = pathMatch.groups.parentURL;
  splittedPath.path = pathMatch.groups.path;
  return splittedPath;
}

module.exports = splitPath;
