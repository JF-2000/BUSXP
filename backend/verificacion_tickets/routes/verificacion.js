const express = require('express');
const verif = require("../controllers/verificar")
var app = express();

app.post('/verificar/verificarticket', verif.verif)


module.exports = app;