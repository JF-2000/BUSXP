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
        var choferes = await sql.query(`SELECT r.idruta, SUM(total)as Total, CONCAT(rutadesde,' ', rutahasta) AS Ruta
        FROM tickets t 
        inner join viajes v on v.idviaje = t.idviaje
        inner join rutas r on r.idruta = v.idruta
        group by rutadesde,rutahasta,r.idruta`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}

controllers.rutasmasvendidas = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT  STRING_AGG(CONVERT(VARCHAR(25), CONCAT(rutadesde,' ', rutahasta)), CHAR(0)) AS Ruta, COUNT(v.idruta) as Cant
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

controllers.horasmc = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT COUNT(v.idhorario) as Cant, CONVERT(varchar,hora,0)hora
        From viajes v
        inner join horarios h on h.idhorario = v.idhorario
        Group By hora`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}
controllers.choferesA = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT COUNT(idchofer) as Conductores, COUNT(activo) as Cant FROM choferes group by activo`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}
controllers.usuariosA = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT COUNT(iduser) as Usuarios, COUNT(activo) as Cant FROM usuarios group by activo`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}
controllers.ticketsV = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT CONCAT(nombre,' ', apellido) As Chofer, COUNT(t.idchofer) as Validaciones
        FROM tickets t
        inner join choferes c on c.idchofer= t.idchofer
        group by nombre,apellido
        `)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}




module.exports = controllers;