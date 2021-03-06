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

    let pathsCollected;
    try {
      pathsCollected = fs.readdirSync(
        `${this.dir}/${getURLFolderName(parentURL)}`,
      );
    } catch (error) {
      throw new URLNotStoredError(`${parentURL} was not stored.`);
    }

    const pathFolderName = getPathFolderName(path);

    if (pathsCollected.includes(pathFolderName)) return;

    const parentURLFolderName = getURLFolderName(parentURL);
    const pathDir = fs.mkdirSync(
      `${this.dir}/${parentURLFolderName}/${pathFolderName}`,
      {
        recursive: true,
      },
    );

    const parsedParentURL = parentURL.endsWith('/')
      ? parentURL.slice(0, parentURL.length - 1)
      : parentURL;

    const parsedPath = path.startsWith('/') ? path : `/${path}`;

    fs.writeFileSync(
      `${pathDir}/metadata.json`,
      JSON.stringify({
        parentURL,
        fullURL: `${parsedParentURL}${parsedPath}`,
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
    let pathsCollected;
    try {
      pathsCollected = fs.readdirSync(`${this.dir}/${parentURLFolderName}`);
    } catch (error) {
      throw new URLNotStoredError(`${parentURL} was not stored`);
    }
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
      let pathsCollected;
      try {
        pathsCollected = fs.readdirSync(`${this.dir}/${URLFolderName}`);
      } catch (error) {
        return false;
      }
      const { path } = URL.match(/.+?\/\/.+?\/(?<path>[^?]*)/).groups;
      const pathFolderName = getPathFolderName(path);

      return pathsCollected.includes(pathFolderName);
    }

    const urlsCollected = fs.readdirSync(this.dir);

    return urlsCollected.includes(URLFolderName);
  }
}

module.exports = DataBase;
