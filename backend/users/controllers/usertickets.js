const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.ticketsdelusuario = async function(req,res){
    const id = req.params.iduser;

    await sql.connect(db)
    var tickets = await sql.query(`select idticket,v.idviaje,iduser,personas, rutadesde, rutahasta, FORMAT(fecha,'dd-MM-yyyy')fechac,
    LTRIM(RIGHT(CONVERT(VARCHAR(20), fecha, 100), 7))horac,total, CONVERT(varchar,hora,0)horat
    from tickets t left outer join viajes v on v.idviaje = t.idviaje inner join horarios h on h.idhorario = v.idhorario
    inner join rutas r on r.idruta = v.idruta
    where iduser = ${id} and hora >= CONVERT(time,SYSDATETIME()) and CONVERT(date,fecha) >= CONVERT(date,SYSDATETIME())`)
    const data = tickets.recordset;
    res.send(data)
}

module.exports = controllers;