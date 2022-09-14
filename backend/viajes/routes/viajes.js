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
app.get('/viajes/:idviaje', viajes.viajeid)

app.post('/viajes/max', viajes.viajemax)
app.post('/viajes/res', viajes.viajeres)

module.exports = app;