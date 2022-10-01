const express = require('express');
const verif = require("../controllers/verificar")
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/verificar/verificarticket', verif.verif)


module.exports = app;