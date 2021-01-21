/* eslint no-constant-condition: off */

function getCharacterPositionsFromString(character, string) {
  let characterPosition = 0;
  const characterPositions = [];
  while (true) {
    characterPosition = string.indexOf(character, characterPosition);
    if (characterPosition === -1) break;
    characterPositions.push(characterPosition);
    characterPosition += 1;
  }

  return characterPositions;
}

module.exports = getCharacterPositionsFromString;
