const express = require('express');
const registrar = require("../controllers/registrar")
const verificar = require("../controllers/verificar")
const login = require("../controllers/login")
const user = require("../controllers/usertickets")
const Alluser = require("../controllers/Allusers")
var app = express();

app.post('/registrar', registrar.registrar);
app.post('/nuevoU', registrar.nuevoU)
app.post('/inauser', Alluser.inhabilitaruser);
app.post('/verificar/verificaruser', verificar.verificarmail);
app.post('/login',login.login);
app.get('/Allusuarios', Alluser.Allusers);
app.get('/encriptaros', login.encriptop);
app.get('/usuarios', registrar.usuarios);
app.get('/ticket/inv/:iduser', user.ticketsdelusuario);
app.post('/ticket/compartir', user.compartirticket);
app.get('/users/:iduser', Alluser.userid)

module.exports = app;