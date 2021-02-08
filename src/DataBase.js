const fs = require('fs');
const URLNotStoredError = require('./errors/database-errors/URLNotStoredError.js');
const PathNotStoredError = require('./errors/database-errors/PathNotStoredError.js');
const getURLFolderName = require('./utils/getURLFolderName.js');
const getPathFolderName = require('./utils/getPathFolderName.js');
const isPath = require('./utils/isPath.js');

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

  addPath(path, pathMetaData, parentURL) {
    if (typeof path !== 'string') {
      throw new TypeError(`${path} is not a string`);
    } else if (typeof pathMetaData !== 'object') {
      throw new TypeError(`${pathMetaData} is not a object`);
    } else if (typeof parentURL !== 'string') {
      throw new TypeError(`${parentURL} is not a string`);
    }

    const pathsCollected = fs.readdirSync(
      `${this.dir}/${getURLFolderName(parentURL)}`,
    );
    const pathFolderName = getPathFolderName(path);

    if (pathsCollected.includes(pathFolderName)) return;

    const pathDir = fs.mkdirSync(`${this.dir}/${pathFolderName}`, {
      recursive: true,
    });

    fs.writeFileSync(
      `${pathDir}/metadata.json`,
      JSON.stringify({
        parentURL,
        fullURL: `${parentURL}${path}`,
        metadata: pathMetaData,
      }),
    );
  }

  getURL(URL) {
    if (typeof URL !== 'string') throw new TypeError(`${URL} is not a string`);

    const urlsCollected = fs.readdirSync(this.dir);
    const URLFolderName = getURLFolderName(URL);

    if (!urlsCollected.includes(URLFolderName)) {
      throw new URLNotStoredError(`${URL} was not stored`);
    }

    const URLpath = `${this.dir}/${getURLFolderName(URL)}`;
    const URLContent = JSON.parse(
      fs.readFileSync(`${URLpath}/metadata.json`, 'utf8'),
    );

    return URLContent;
  }

  getPath(path, parentURL) {
    if (typeof path !== 'string') {
      throw new TypeError(`${path} is not a string`);
    } else if (typeof parentURL !== 'string') {
      throw new TypeError(`${parentURL} is not a string`);
    }

    const parentURLFolderName = getURLFolderName(parentURL);
    const pathsCollected = fs.readdirSync(`${this.dir}/${parentURLFolderName}`);
    const pathFolderName = getPathFolderName(path);

    if (!pathsCollected.includes(pathFolderName)) {
      throw new PathNotStoredError(`${path} was not stored`);
    }

    const pathPath = `${this.dir}/${parentURLFolderName}/${getPathFolderName(
      path,
    )}`;
    const pathContent = JSON.parse(
      fs.readFileSync(`${pathPath}/metadata.json`, 'utf8'),
    );

    return pathContent;
  }

  includes(URL) {
    if (typeof URL !== 'string') {
      throw new TypeError(`${URL} is not a string`);
    }

    const URLFolderName = getURLFolderName(URL);
    if (isPath(URL)) {
      const pathsCollected = fs.readdirSync(`${this.dir}/${URLFolderName}`);
      const { path } = URL.match(/.+?\/\/.+?\/(?<path>[^?]*)/).groups;
      const pathFolderName = getPathFolderName(path);

      return pathsCollected.includes(pathFolderName);
    }

    const urlsCollected = fs.readdirSync(this.dir);

    return urlsCollected.includes(URLFolderName);
  }
}

module.exports = DataBase;
