/**
 * Module Dependencies
 */
var util = require('util')
  , HttpBearerStrategy = require('passport-http-bearer')
  , jsonwebtoken = require('jsonwebtoken');

function ThinkfulStrategy (options, verify) {
  options = options || {};

  HttpBearerStrategy.call(this, options, function verifyJWT (token, done) {
    jsonwebtoken.verify(token, this._secret, function (err, userToken) {
      if (err) { return done(err, false); }
      verify(userToken, done);
    });
  });

  this.name = 'thinkful';
  this._secret = options.secret;
}

/**
 * Inherit from HttpBearerStrategy
 */
util.inherits(ThinkfulStrategy, HttpBearerStrategy);

ThinkfulStrategy.prototype.authenticate = function tfAuthenticate (req) {
  var token =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.cookies['Tf-Authorization'];

  if (/^Bearer/.test(token)) {
    token = 'Bearer ' + token;
  }

  req.headers.authorization = token;

  HttpBearerStrategy.authenticate.call(this, req);
};

/**
 * Expose `Strategy`.
 */
module.exports = ThinkfulStrategy;