const express = require('express');
const choferes = require("../controllers/choferes")
var app = express();


app.get('/choferes/allchoferes', choferes.allchoferes)
app.get('/choferes/uchoferes', choferes.uchoferes)
app.get('/choferes/viajeschofer/:idchofer', choferes.viajeschoferes)
app.get('/choferes/misviajes/:idchofer', choferes.misviajes)
app.post('/choferes/asignarviaje', choferes.asignarviajes)
app.post('/choferes/ubicacion', choferes.ubicacion)


module.exports = app;