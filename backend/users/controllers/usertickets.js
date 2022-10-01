const db = require("../../conection");
const sql = require('mssql');
const crypt = require('../../helpers/encript')
const controllers = {};

controllers.ticketsdelusuario = async function(req,res){
    try {
        const id = req.params.iduser;
        var vkeys = [];
        await sql.connect(db)
        var tickets = await sql.query(`select idticket,v.idviaje,iduser,personas, rutadesde, rutahasta, FORMAT(fecha,'dd-MM-yyyy')fechac,
        LTRIM(RIGHT(CONVERT(VARCHAR(20), fecha, 100), 7))horac,total, CONVERT(varchar,hora,0)horat
        from tickets t left outer join viajes v on v.idviaje = t.idviaje inner join horarios h on h.idhorario = v.idhorario
        inner join rutas r on r.idruta = v.idruta
        where iduser = ${id} and CONVERT(time,hora,108) >= CONVERT(time,SYSDATETIME(),108) and FORMAT(fecha,'dd-MM-yyyy') >= FORMAT(GETDATE(),'dd-MM-yyyy')`)

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


module.exports = controllers;