const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.total = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT DATENAME(month,fecha) as Fecha,
        SUM(total)as Total
        FROM tickets
        Group BY fecha`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}

controllers.totalxruta = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT r.idruta, SUM(total)as Total, STRING_AGG(CONVERT(VARCHAR(25), CONCAT(rutadesde,' ', rutahasta)), CHAR(0)) AS ruta
        FROM tickets t 
        inner join viajes v on v.idviaje = t.idviaje
        inner join rutas r on r.idruta = v.idruta
        group by r.idruta`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}



module.exports = controllers;