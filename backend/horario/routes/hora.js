const express = require('express');
const hora = require("../controllers/hora")
var app = express();

app.get('/hora/allhorario', hora.allhorarios);
app.get('/hora/horariolist', hora.horariolist);
app.get('/hora/:idhora', hora.horarioidA);
app.get('/hora/horariolist', hora.horariolist);
app.post('/hora/chorario', hora.creahorario);
app.post('/hora/inahora', hora.inhabilitarhorario);
app.post('/hora/mhorario', hora.modificahorario);

module.exports = app;