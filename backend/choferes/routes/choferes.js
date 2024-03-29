const express = require('express');
const choferes = require("../controllers/choferes")
var app = express();


app.get('/choferes/allchoferes', choferes.allchoferes)
app.get('/choferes/uchoferes', choferes.uchoferes)
app.get('/choferes/coordenadas', choferes.coordschoferes)
app.get('/choferes/:idchofer', choferes.idchofer)
app.get('/choferes/viajeschofer/:idchofer', choferes.viajeschoferes)
app.get('/choferes/misviajes/:idchofer', choferes.misviajes)
app.post('/choferes/registrarchofer', choferes.registrarchofer)
app.post('/choferes/asignarviaje', choferes.asignarviajes)
app.post('/choferes/ubicacion', choferes.ubicacion)
app.post('/choferes/inachofer', choferes.inachofer)
app.post('/choferes/modificarC', choferes.modificarchofer)

module.exports = app;