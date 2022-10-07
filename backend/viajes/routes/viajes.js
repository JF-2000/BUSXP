const express = require('express');
const viajes = require("../controllers/viajes")
var app = express();

app.get('/viajes/allgenerar', viajes.generarviajes)
app.get('/viajes/allviajes', viajes.allviajes)
app.get('/viajes/allviajesA', viajes.allviajesA)//Administrador
app.get('/viajes/:idviaje', viajes.viajeid)
app.get('/viajes/admin/:idviaje', viajes.viajeidA)
app.post('/viajes/max', viajes.viajemax)
app.post('/viajes/res', viajes.viajeres)
app.post('/viajes/iviaje', viajes.inhabilitarviaje)
app.post('/viajes/createviaje', viajes.createviajes)
app.post('/viajes/mviaje', viajes.modificaviaje)


module.exports = app;