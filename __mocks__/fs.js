/* eslint no-undef: off, no-underscore-dangle: off */
const path = require('path');

const fs = jest.createMockFromModule('fs');

let mockDir = Object.create(null);
function __setMockPath(newMockPath) {
  mockDir = Object.create(null);
  for (const newPath of newMockPath) {
    const dir = path.dirname(newPath);

    if (!mockDir[dir]) {
      mockDir[dir] = [];
    }

    mockDir[dir].push(path.basename(newPath));
  }
}

function readdirSync(directoryPath) {
  return mockDir[directoryPath] || [];
}

function mkdirSync(pathToDirectory, options = {}) {
  if (options.recursive) {
    return pathToDirectory;
  }
  return undefined;
}

fs.__setMockPath = __setMockPath;
fs.readdirSync = readdirSync;
fs.mkdirSync = jest.fn(mkdirSync);

module.exports = fs;
