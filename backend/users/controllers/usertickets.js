const db = require("../../conection");
const sql = require('mssql');
const crypt = require('../../helpers/encript')
const controllers = {};

controllers.ticketsdelusuario = async function(req,res){
    try {
        const id = req.params.iduser;
        var vkeys = [];
        await sql.connect(db)
        var tickets = await sql.query(`select u.nombre, idticket,v.idviaje,t.iduser,personas, rutadesde, rutahasta, FORMAT(t.fecha,'dd-MM-yyyy')fechac,
        LTRIM(RIGHT(CONVERT(VARCHAR(20), fecha, 100), 7))horac,total, CONVERT(varchar,hora,0)horat
        from tickets t left outer join viajes v on v.idviaje = t.idviaje inner join horarios h on h.idhorario = v.idhorario
        inner join rutas r on r.idruta = v.idruta inner join usuarios u on u.iduser = t.iduser
        where t.iduser = 1 and t.activo = 1 and CONVERT(varchar,t.fecha,1) >= CONVERT(varchar,GETDATE(),1) and convert(time, DATEADD(minute,20,hora),108) >= CONVERT(time,SYSDATETIME(),108)`)

        var datos = tickets.recordset;
        for(i=0; i < tickets.recordset.length; i++){
            vkeys.push(await crypt.encriptar(tickets.recordset[i].idticket));
        }
        
        const data = {datos,vkeys};
        res.send(data)


    } catch (error) {
        console.log(error)
    }

}

controllers.compartirticket = async function(req,res){
    try {
        const {idticket} = req.body;
        await sql.connect(db)
        var reticket = await sql.query(`SELECT idticket,t.idviaje,iduser,fecha,personas,total,monto
        FROM tickets t inner join viajes v on v.idviaje = t.idviaje
        WHERE idticket = ${idticket} and t.activo = 1`)
        var ticket = reticket.recordset
        if(ticket.length > 0){
            var request = new sql.Request();
            request
            .input('idviaje',sql.Int,ticket[0].idviaje)
            .input('iduser',sql.Int,ticket[0].iduser)
            .input('total',sql.Money,ticket[0].monto)
            .input('fecha',sql.DateTime,ticket[0].fecha)
            .query(`INSERT INTO tickets (idviaje,iduser,personas,credencial,total,fecha) VALUES (@idviaje,@iduser,1,'COMPARTIDO',@total,@fecha)`,[ticket[0].idviaje,ticket[0].iduser,ticket[0].monto,ticket[0].fecha])

            await sql.query(`UPDATE tickets SET total = total - ${ticket[0].monto}, personas = personas - 1 WHERE idticket = ${ticket[0].idticket}`)
            res.sendStatus(200)
        }else{
            res.send('err')
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = controllers;