const express = require('express');
const olvidapass = require("../controllers/olvidapass")
var app = express();

app.post('/recuperar/olvide', olvidapass.olvida);
app.post('/recuperar/restablecerpass', olvidapass.rescontra);

module.exports = app;