const getCharacterPositionsFromString = require('./getCharacterPositionsFromString.js');

function getURLFolderName(URL) {
  const slashPositions = getCharacterPositionsFromString('/', URL);
  const domain = URL.slice(slashPositions[1] + 1, slashPositions[2]);

  const a = domain.match(/[A-Z0-9-]+/gi);
  return a.join('');
}

module.exports = getURLFolderName;
