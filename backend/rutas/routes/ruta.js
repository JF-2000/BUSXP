const express = require('express');
const ruta = require("../controllers/ruta")
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/ruta/allrutas', ruta.allruta)
app.get('/ruta/:idruta', ruta.rutaxid)
app.post('/ruta/cruta', ruta.crearuta)
app.post('/ruta/mruta', ruta.modificaruta)
app.post('/ruta/iruta', ruta.inhabilitarruta)


module.exports = app;