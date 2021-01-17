class NoURLError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoURLError';
  }
}

module.exports = NoURLError;
