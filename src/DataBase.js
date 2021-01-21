const fs = require('fs');
const getURLFolderName = require('./utils/getURLFolderName.js');

class DataBase {
  constructor() {
    this.dir = './data';
  }

  addURL(URL, URLMetaData) {
    if (typeof URL !== 'string') {
      throw new TypeError(`${URL} is not a string`);
    } else if (typeof URLMetaData !== 'object') {
      throw new TypeError(`${URLMetaData} is not a object`);
    }

    const urlsCollected = fs.readdirSync(this.dir);
    const URLFolderName = getURLFolderName(URL);

    if (urlsCollected.includes(URLFolderName)) return;

    const URLDir = fs.mkdirSync(`${this.dir}/${URLFolderName}`, {
      recursive: true,
    });

    fs.writeFileSync(
      `${URLDir}/metadata.json`,
      JSON.stringify({ URL, metadata: URLMetaData }),
    );
  }
}

module.exports = DataBase;
