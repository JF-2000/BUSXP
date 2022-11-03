const express = require('express');
const mail = require("../controllers/correos")
var app = express();

app.post('/correspondencia/reporteviaje',mail.reporteviaje)


module.exports = app;