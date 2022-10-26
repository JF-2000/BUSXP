const express = require('express');
const charts = require("../controllers/charts")
var app = express();


app.get('/charts/totales', charts.total);
app.get('/charts/totalxruta', charts.totalxruta);

module.exports = app;