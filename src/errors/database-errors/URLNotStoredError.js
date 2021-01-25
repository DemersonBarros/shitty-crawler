class URLNotStoredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoURLStoredError';
  }
}

module.exports = URLNotStoredError;
