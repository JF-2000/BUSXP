const express = require('express');
const registrar = require("../controllers/registrar")
const verificar = require("../controllers/verificar")
const login = require("../controllers/login")
const user = require("../controllers/usertickets")
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

app.post('/registrar', registrar.registrar)
app.post('/verificar', verificar.verificarmail)
app.post('/login',login.login)
app.get('/usuarios', registrar.usuarios)
app.get('/ticket/inv/:iduser', user.ticketsdelusuario)

module.exports = app;