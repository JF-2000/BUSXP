const express = require('express');
const ticket = require("../controllers/ticket")
var app = express();

app.post('/ticket/compra', ticket.pagoticket)
app.get('/ticket/currency', ticket.usatodop)

module.exports = app;