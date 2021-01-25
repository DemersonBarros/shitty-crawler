class PathNotStoredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PathNotStoredError';
  }
}

module.exports = PathNotStoredError;
