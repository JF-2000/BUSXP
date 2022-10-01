var simplecrypt = require("./simplecrypt");
var sc = simplecrypt();

const modulo = {};

modulo.encriptar = async function(text){
    var code = sc.encrypt(text)
    return code
}

modulo.desencriptar = async function(text){
    var code = sc.decrypt(text)
    return code
}

module.exports = modulo;