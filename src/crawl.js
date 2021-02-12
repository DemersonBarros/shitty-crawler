/* eslint no-continue: off, no-await-in-loop: off */
const axios = require('axios');
const DataBase = require('./DataBase.js');
const divideHTMLIntoHeadAndBody = require('./divideHTMLIntoHeadAndBody.js');
const getURLsFromBody = require('./getURLsFromBody.js');
const getMetadataFromHead = require('./getMetadataFromHead.js');
const isPath = require('./utils/isPath.js');
const splitPath = require('./utils/splitPath.js');

const db = new DataBase();

async function crawl(URLs) {
  while (URLs.length !== 0) {
    const URL = URLs[0];
    console.log(`Computing the ${URL}`);

    if (db.includes(URL)) {
      URLs.splice(0, 1);
      console.log(`${URL} is already on the database`);
      continue;
    }

    let response;
    try {
      response = await axios.get(URL);
      console.log(`the resonse of ${URL} was collected`);
    } catch (error) {
      URLs.splice(0, 1);
      console.log(`Something happened while collecting ${URL} response`);
      continue;
    }

    const dividedHTML = divideHTMLIntoHeadAndBody(response.data);
    const newURLs = getURLsFromBody(URL, dividedHTML.body);
    let a = 0;
    newURLs.forEach((newURL) => {
      if (!URLs.includes(newURL) || !db.includes(newURL)) {
        URLs.push(newURL);
        a++;
      }
    });
    console.log(`Was collected a total of ${a} new urls`);
    const metadata = getMetadataFromHead(dividedHTML.head);
    if (isPath(URL)) {
      const splittedPath = splitPath(URL);
      db.addPath(splittedPath.path, metadata, splittedPath.parentURL);
      console.log(`Path: ${URL} was added to the database`);
      continue;
    }
    db.addURL(URL, metadata);
    console.log(`${URL} was added to the database`);
    URLs.splice(0, 1);
  }
}

module.exports = crawl;
