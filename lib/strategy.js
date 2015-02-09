/**
 * Module Dependencies
 */
var util = require('unit')
  , PassportStrategy = require('passport-strategy');

function ThinkfulStrategy (options, verify) {
  options = options || {};

  passport.Strategy.call(this);

  this.name = 'thinkful';
}

/**
 * Inherit from PassportStrategy
 */
util.inherits(ThinkfulStrategy, PassportStrategy);

/**
 * Expose `Strategy`.
 */
module.exports = ThinkfulStrategy;