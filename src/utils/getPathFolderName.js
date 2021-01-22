function getPathFolderName(path) {
  const p = decodeURI(path);
  return p.match(/[A-Z0-9-\s]+/gi).join('');
}

module.exports = getPathFolderName;
