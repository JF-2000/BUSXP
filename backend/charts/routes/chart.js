const express = require('express');
const charts = require("../controllers/charts")
var app = express();


app.get('/charts/totales', charts.total);
app.get('/charts/totalxruta', charts.totalxruta);
app.get('/charts/rutasmv', charts.rutasmasvendidas);
app.get('/charts/horasmc', charts.horasmc);
app.get('/charts/choferesA', charts.choferesA);
app.get('/charts/usuariosA', charts.usuariosA);
app.get('/charts/ticketsV', charts.ticketsV);
app.get('/charts/reportes', charts.reportes);

module.exports = app;