const db = require("../../conection");
const sql = require('mssql');
const mail = require('../../helpers/mailer');
const { viajeid } = require("../../viajes/controllers/viajes");
const controllers = {};

controllers.reporteviaje = async function(req,res){
    try {
        const {viaje,msg} = req.body;
        
        if(msg == '' || msg == null || msg == undefined){
            res.send('err')
            return false;
        }
        if(viaje == '' || viaje == null || viaje == undefined || viajeid == 0){
            res.send('err')
            return false;
        }
        await sql.connect(db)
        var emails = await sql.query(`select email 
        from usuarios u inner join tickets t on t.iduser = u.iduser
        inner join viajes v on v.idviaje = t.idviaje
        where CONVERT(varchar,t.fecha,1) >= CONVERT(varchar,GETDATE(),1) and v.idviaje = ${viaje}`)
        data = emails.recordset;
        mail.emailreporte(data,msg);
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
}

setInterval(recordatorio,1200000);
async function recordatorio(){
    try {
        await sql.connect(db)
        var emails = await sql.query(`select email
        from usuarios u inner join tickets t on t.iduser = u.iduser
        inner join viajes v on v.idviaje = t.idviaje inner join horarios h on h.idhorario = v.idhorario
        where CONVERT(varchar,t.fecha,1) >= CONVERT(varchar,GETDATE(),1)
        and CONVERT(time,SYSDATETIME(),108) <= CONVERT(time,hora,108) and CONVERT(time,SYSDATETIME(),108) >= convert(time, DATEADD(minute,-20,hora),108)
        group by email`)
        data = emails.recordset
        mail.emailrecordatorio(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers;