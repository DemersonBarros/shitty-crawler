function divideHTMLIntoHeadAndBody(HTML) {
  if (typeof HTML !== 'string') {
    throw new TypeError(`${HTML} is not a string`);
  }

  const HTMLDivided = {};
  const headMatch = HTML.match(/<(head |head).*?>.*?<\/head>/gis);
  const bodyMatch = HTML.match(/<(body |body).*?>.*?<\/body>/gis);

  HTMLDivided.head = headMatch ? headMatch[0] : '';
  HTMLDivided.body = bodyMatch ? bodyMatch[0] : '';

  return HTMLDivided;
}

module.exports = divideHTMLIntoHeadAndBody;
