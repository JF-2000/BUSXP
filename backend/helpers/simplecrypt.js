// Simple module to encrypt / decrypt strings
var crypto = require('crypto');
module.exports = function(opts) {
  opts = opts || {};

  var CRYPT_METHOD = opts.method || 'aes192',
      PASS = 'jjrr2000jesb2000',
      SALT = '12',
      encoding = opts.encoding || 'utf8',
      digestEncoding = opts.digestEncoding || 'hex';

  return {
    encrypt: function (message) {
      var cipher = crypto.createCipher(CRYPT_METHOD, PASS);
      var digest = cipher.update(message + SALT, encoding, digestEncoding);
      return digest + cipher.final(digestEncoding);
    },

    decrypt: function (digest) {
      var decipher = crypto.createDecipher(CRYPT_METHOD, PASS);
      var message = decipher.update(digest, digestEncoding, encoding);
      message = message + decipher.final(encoding);
      return message.substring(0, message.length - SALT.length);
    },

    password: function () {
      return PASS;
    },

    salt: function() {
      return SALT;
    }
  };
};
