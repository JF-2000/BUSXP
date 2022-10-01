const express = require('express');
const ticket = require("../controllers/ticket")
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/ticket/compra', ticket.pagoticket)
app.get('/ticket/currency', ticket.usatodop)

module.exports = app;