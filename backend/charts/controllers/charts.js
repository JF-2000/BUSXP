const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.total = async function (req, res) {
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT DATENAME(month,fecha) as Fecha,
        SUM(total)as Total
        FROM tickets
        Group BY DATENAME(month,fecha), MONTH(fecha)`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}

controllers.totalxruta = async function (req, res) {
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

controllers.rutasmasvendidas = async function (req, res) {
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT  CONCAT(rutadesde,' ', rutahasta) AS Ruta, COUNT(v.idruta) as Cant
        FROM tickets t 
        inner join viajes v on v.idviaje = t.idviaje
        inner join rutas r on r.idruta = v.idruta
        group by rutadesde,rutahasta`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}

controllers.horasmc = async function (req, res) {
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT TOP (5) COUNT(dbo.viajes.idhorario) AS Cant, CONVERT(varchar, dbo.horarios.hora, 0) AS Hora
        FROM dbo.tickets INNER JOIN
        dbo.viajes ON dbo.tickets.idviaje = dbo.viajes.idviaje INNER JOIN
        dbo.horarios ON dbo.viajes.idhorario = dbo.horarios.idhorario
        GROUP BY dbo.viajes.idhorario, dbo.horarios.hora`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}
controllers.choferesA = async function (req, res) {
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT COUNT(idchofer) as Conductores, COUNT(activo) as Cant FROM choferes group by activo`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}
controllers.usuariosA = async function (req, res) {
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT COUNT(iduser) as Usuarios, COUNT(activo) as Cant FROM usuarios group by activo`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}
controllers.ticketsV = async function (req, res) {
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
controllers.reportes = async function (req, res) {
    try {
        cons ={desde, hasta} = req.body;
        await sql.connect(db)
        var choferes = await sql.query(`SELECT dbo.tickets.idticket AS Ticket_Id,CONCAT(rutadesde, ' ', rutahasta) as Ruta, CONVERT(varchar, dbo.horarios.hora, 0) AS Hora, 
        CONVERT(varchar,dbo.tickets.fecha,3) AS Fecha, dbo.tickets.total AS Total,
        dbo.tickets.personas AS 'Cant'
        FROM dbo.tickets INNER JOIN
        dbo.viajes ON dbo.tickets.idviaje = dbo.viajes.idviaje INNER JOIN
        dbo.horarios ON dbo.viajes.idhorario = dbo.horarios.idhorario INNER JOIN
        dbo.rutas ON dbo.viajes.idruta = dbo.rutas.idruta
        GROUP BY dbo.viajes.idhorario, dbo.horarios.hora, dbo.tickets.idticket, dbo.tickets.idviaje, dbo.tickets.fecha, dbo.tickets.total, dbo.tickets.personas, dbo.rutas.rutadesde, dbo.rutas.rutahasta`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}


controllers.reportesF = async function (req, res) {
    try {
        cons ={desde, hasta} = req.body;
        await sql.connect(db)
        var choferes = await sql.query(`SELECT dbo.tickets.idticket AS Ticket_Id,CONCAT(rutadesde, ' ', rutahasta) as Ruta, CONVERT(varchar, dbo.horarios.hora, 0) AS Hora, 
        CONVERT(varchar,dbo.tickets.fecha,3) AS Fecha, dbo.tickets.total AS Total,
        dbo.tickets.personas AS 'Cant'
        FROM dbo.tickets INNER JOIN
        dbo.viajes ON dbo.tickets.idviaje = dbo.viajes.idviaje INNER JOIN
        dbo.horarios ON dbo.viajes.idhorario = dbo.horarios.idhorario INNER JOIN
        dbo.rutas ON dbo.viajes.idruta = dbo.rutas.idruta
		WHERE FORMAT(dbo.tickets.fecha, 'yyyy-MM-dd')>= '${desde}' AND FORMAT(fecha, 'yyyy-MM-dd') <= '${hasta}'
        GROUP BY dbo.viajes.idhorario, dbo.horarios.hora, dbo.tickets.idticket, dbo.tickets.idviaje, dbo.tickets.fecha, dbo.tickets.total, dbo.tickets.personas, dbo.rutas.rutadesde, dbo.rutas.rutahasta`)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }

}




module.exports = controllers;