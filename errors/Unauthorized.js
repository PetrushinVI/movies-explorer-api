const { UNAUTHORIZED } = require('./StatusCode');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}
module.exports = Unauthorized;
