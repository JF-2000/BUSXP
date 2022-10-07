const express = require('express');
const ruta = require("../controllers/ruta")
var app = express();

app.get('/ruta/allrutas', ruta.allruta)
app.get('/ruta/:idruta', ruta.rutaxid)
app.post('/ruta/cruta', ruta.crearuta)
app.post('/ruta/mruta', ruta.modificaruta)
app.post('/ruta/iruta', ruta.inhabilitarruta)


module.exports = app;