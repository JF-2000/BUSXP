const db = require("../../conection");
const sql = require('mssql');
const crypt = require('../../helpers/encript')
const controllers = {};

controllers.verif = async function(req,res){
    try {
        const {code, iduser} = req.body;

        var id = await crypt.desencriptar(code);
        await sql.connect(db)
        var choder = await sql.query(`SELECT idchofer FROM choferes WHERE iduser = ${iduser}`)
        if(choder.recordset.length > 0){
            var idchofer = choder.recordset[0].idchofer
        }else{
            return res.send('nochofer')
        }

        var ticket = await sql.query(`select v.idviaje,iduser,personas, rutadesde, rutahasta, FORMAT(fecha,'dd-MM-yyyy')fechac,
        LTRIM(RIGHT(CONVERT(VARCHAR(20), fecha, 100), 7))horac,total, CONVERT(varchar,hora,0)horat, t.activo
        from tickets t left outer join viajes v on v.idviaje = t.idviaje inner join horarios h on h.idhorario = v.idhorario
        inner join rutas r on r.idruta = v.idruta
        where idticket = ${id} and CONVERT(varchar,t.fecha,1) >= CONVERT(varchar,GETDATE(),1) and convert(time, DATEADD(minute,20,hora),108) >= CONVERT(time,SYSDATETIME(),108)`)
        if(ticket.recordset.length <= 0){
            res.send('noexist')
        }
        if(ticket.recordset[0].activo === 0){
            res.send('used')
        }
        if(ticket.recordset[0].activo === 1){
            var data = ticket.recordset
            res.send(data)
            await sql.query(`UPDATE tickets SET activo = 0, idchofer = '${idchofer}' where idticket = ${id}`)
        }
 
    } catch (error) {
        console.log(error)
        res.send('noexist')
    }
      
}

module.exports = controllers;