/**
 * Module Dependencies
 */
var util = require('util')
  , HttpBearerStrategy = require('passport-http-bearer')
  , jsonwebtoken = require('jsonwebtoken');

function ThinkfulStrategy (options, verify) {
  options = options || {};

  HttpBearerStrategy.call(this, function verifyJWT (req, token, done) {
    jsonwebtoken.verify(token, this._secret, function (err, user) {
      if (err) { return done(err, false); }
      verify(req, user, done);
    });
  });

  this.name = 'thinkful';
  this._secret = options.secret;
  this._passReqToCallback = true;
}

/**
 * Inherit from HttpBearerStrategy
 */
util.inherits(ThinkfulStrategy, HttpBearerStrategy);

ThinkfulStrategy.prototype.authenticate = function tfAuthenticate (req) {
  var token = req.headers.authorization || req.cookies['Tf-Authorization'];

  if (!/^Bearer/.test(token)) {
    token = 'Bearer ' + token;
  }

  req.headers.authorization = token;

  HttpBearerStrategy.prototype.authenticate.call(this, req);
};

/**
 * Expose `Strategy`.
 */
module.exports = ThinkfulStrategy;
