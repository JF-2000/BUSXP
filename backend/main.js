const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Rutas
app.use(require('./users/routes/users'));
app.use(require('./viajes/routes/viajes'));



var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port   
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = app;
