function getMetadataFromHead(head) {
  if (typeof head !== 'string') {
    throw new TypeError(`${head} is not a string`);
  }

  const metadata = {};
  const metaElements = head.match(/<meta .*?>/gis);

  if (!metaElements) return metadata;

  metaElements.forEach((metaElement) => {
    const httpEquivRegex = /http-equiv/gi;

    if (httpEquivRegex.test(metaElement)) return;

    const nameMatch = metaElement.match(
      /(name|itemprop|property)=("|')(?<name>.*?)("|')/is,
    );
    const contentMatch = metaElement.match(
      /content=("|')(?<content>.*?)("|')/is,
    );

    const name = nameMatch ? nameMatch.groups.name : null;
    const content = contentMatch ? contentMatch.groups.content : null;

    if (!name) {
      const charsetRegex = /charset=("|')(?<charset>.*?)("|')/is;

      if (!charsetRegex.test(metaElement)) return;

      metadata.charset = metaElement.match(
        /charset=("|')(?<charset>.*?)("|')/is,
      ).groups.charset;

      return;
    }

    metadata[name] = content;
  });

  return metadata;
}

module.exports = getMetadataFromHead;
