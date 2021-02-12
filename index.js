const crawl = require('./src/crawl.js');
const getUserURLs = require('./src/getUserURLs.js');

const urls = getUserURLs();

function smellyCode() {
  crawl(urls)
    .then(console.log)
    .catch((error) => {
      console.error(error);
      urls.splice(0, 1);
      smellyCode();
    });
}

smellyCode();
