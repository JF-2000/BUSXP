const express = require('express');
const choferes = require("../controllers/choferes")
var app = express();


app.get('/choferes/allchoferes', choferes.allchoferes)
app.get('/choferes/viajeschofer/:idchofer', choferes.viajeschoferes)
app.post('/choferes/asignarviaje', choferes.asignarviajes)


module.exports = app;