const express = require('express');
const viajes = require("../controllers/viajes")
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

app.get('/viajes/allgenerar', viajes.generarviajes)
app.get('/viajes/allviajes', viajes.allviajes)
app.get('/viajes/allviajesA', viajes.allviajesA)//Administrador
app.get('/viajes/:idviaje', viajes.viajeid)
app.get('/viajes/admin/:idviaje', viajes.viajeidA)
app.post('/viajes/max', viajes.viajemax)
app.post('/viajes/res', viajes.viajeres)
app.post('/viajes/iviaje', viajes.inhabilitarviaje)
app.post('/viajes/mviaje', viajes.modificaviaje)


module.exports = app;