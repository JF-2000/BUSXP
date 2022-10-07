const express = require('express');
const registrar = require("../controllers/registrar")
const verificar = require("../controllers/verificar")
const login = require("../controllers/login")
const user = require("../controllers/usertickets")
var app = express();

app.post('/registrar', registrar.registrar)
app.post('/verificar/verificaruser', verificar.verificarmail)
app.post('/login',login.login)
app.get('/usuarios', registrar.usuarios)
app.get('/ticket/inv/:iduser', user.ticketsdelusuario)

module.exports = app;