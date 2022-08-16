const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.generarviajes = async function(req ,res){
    
    await sql.connect(db)
    var viajes = await sql.query(`SELECT idruta,capacidad,monto,idhorario, CONVERT(varchar,hora,0)hora
    from rutas cross join horarios`);
    var reviajes = viajes.recordset;
    for(x=0;x < reviajes.length;x++){
        var compviaje = await sql.query(`SELECT * FROM viajes 
        WHERE idruta = ${reviajes[x].idruta} and idhorario = ${reviajes[x].idhorario}`)
        if(compviaje.recordset.length > 0){
            continue;
        }else{
            var request = new sql.Request();
            await request
            .input('idruta', sql.Int, reviajes[x].idruta)
            .input('idhorario', sql.Int, reviajes[x].idhorario)
            .input('capacidad', sql.Int, reviajes[x].capacidad)
            .input('monto', sql.Money, reviajes[x].monto)
            .query(`INSERT INTO viajes (idruta,idhorario,capacidad,fcapacidad,monto) VALUES (@idruta,@idhorario,@capacidad,0,@monto)`,[reviajes[x].idruta,reviajes[x].idhorario,reviajes[x].capacidad,reviajes[x].monto])
        }
    }

    res.sendStatus(200)
}

controllers.allviajes = async function(req,res){
    await sql.connect(db)
    var viajes = await sql.query(`SELECT idviaje, rutadesde, rutahasta, v.capacidad, v.fcapacidad, v.monto, CONVERT(varchar,hora,0)hora 
    FROM viajes v
    inner join rutas r on r.idruta = v.idruta 
    inner join horarios h on h.idhorario = v.idhorario
    WHERE v.activo =  1 and CONVERT(time,hora,108) >= CONVERT(time,SYSDATETIME(),108)`)
    var data = viajes.recordset
    res.send(data)
}

controllers.viajeid = async function(req,res){
    const idviaje = req.params.idviaje;
    await sql.connect(db)
    var viaje = await sql.query(`SELECT idviaje, rutadesde, rutahasta, v.capacidad, v.fcapacidad, v.monto, CONVERT(varchar,hora,0)hora 
    FROM viajes v
    inner join rutas r on r.idruta = v.idruta 
    inner join horarios h on h.idhorario = v.idhorario
    WHERE v.activo =  1 and CONVERT(time,hora,108) >= CONVERT(time,SYSDATETIME(),108) and idviaje = ${idviaje} `)
    var data = viaje.recordset[0]
    res.send(data)
}

module.exports = controllers;