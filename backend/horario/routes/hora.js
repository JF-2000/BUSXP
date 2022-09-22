const express = require('express');
const hora = require("../controllers/hora")
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/hora/allhorario', hora.allhorarios)
// app.get('/hora/:idhorario', hora.horaioxid)
app.post('/hora/chorario', hora.creahorario)
app.post('/hora/ihora', hora.inhabilitarhorario)


module.exports = app;