class NotAValidURLError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAValidURLError';
  }
}

module.exports = NotAValidURLError;
