const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.generarviajes = async function(req ,res){
    try {
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
    } catch (error) {
        console.log(error)
    }
}

controllers.allviajes = async function(req,res){
    try {
        await sql.connect(db)
        var viajes = await sql.query(`SELECT idviaje, rutadesde, rutahasta, v.capacidad, v.fcapacidad, v.monto, CONVERT(varchar,hora,0)hora 
        FROM viajes v
        inner join rutas r on r.idruta = v.idruta 
        inner join horarios h on h.idhorario = v.idhorario
        WHERE v.activo =  1 and CONVERT(time,hora,108) >= CONVERT(time,SYSDATETIME(),108)`)
        var data = viajes.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

controllers.allviajesA = async function(req,res){
    try {
        await sql.connect(db)
        var viajes = await sql.query(`SELECT idviaje, rutadesde, rutahasta, v.activo, v.capacidad, v.fcapacidad, v.monto, CONVERT(varchar,hora,0)hora 
        FROM viajes v
        inner join rutas r on r.idruta = v.idruta 
        inner join horarios h on h.idhorario = v.idhorario`)
        var data = viajes.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

controllers.viajeid = async function(req,res){
    try {
        const idviaje = req.params.idviaje;
        await sql.connect(db)
        var viaje = await sql.query(`SELECT idviaje, rutadesde, rutahasta, v.capacidad, v.fcapacidad, v.monto, CONVERT(varchar,hora,0)hora 
        FROM viajes v
        inner join rutas r on r.idruta = v.idruta 
        inner join horarios h on h.idhorario = v.idhorario
        WHERE v.activo =  1 and CONVERT(time,hora,108) >= CONVERT(time,SYSDATETIME(),108) and idviaje = ${idviaje} `)
        var data = viaje.recordset[0]
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

controllers.viajemax = async function(req,res){
    try {
        const {viaje,personas,iduser} = req.body;
        var cantp = parseInt(personas,10)
        await sql.connect(db)
        if(viaje==null||viaje==undefined||viaje==""){
            return res.send('noviaje');
        }
        if(iduser==null||iduser==undefined||iduser==""){
            return res.send('nouser');
        }
        if(personas <= 0){
            return res.send("zero");
        }
        var capviaje = await sql.query(`SELECT idviaje, capacidad, fcapacidad 
        FROM viajes WHERE idviaje = ${viaje}`)
        if(capviaje.recordset[0].fcapacidad == capviaje.recordset[0].capacidad){
            return res.send("max");
        } 
        if((capviaje.recordset[0].fcapacidad + cantp) >= capviaje.recordset[0].capacidad){
            return res.send("maxp");
        }
    
        await sql.query(`UPDATE viajes SET fcapacidad = fcapacidad + ${personas} WHERE idviaje = ${viaje}`)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
 
}

controllers.viajeidA = async function(req,res){
    try {
        const idviaje = req.params.idviaje;
        await sql.connect(db)
        var viaje = await sql.query(`SELECT idviaje, rutadesde, rutahasta, v.capacidad, v.fcapacidad, v.monto, CONVERT(varchar,hora,0)hora 
        FROM viajes v
        inner join rutas r on r.idruta = v.idruta 
        inner join horarios h on h.idhorario = v.idhorario`)
        var data = viaje.recordset[0]
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

controllers.viajeres = async function(req,res){
    try {
        const {viaje,personas} = req.body;
        if(viaje==null||viaje==undefined||viaje==""){
            return res.send('noviaje');
        }
        if(personas <= 0){
            return res.send("zero");
        }
        await sql.connect(db)
        await sql.query(`UPDATE viajes SET fcapacidad = fcapacidad - ${personas} WHERE idviaje = ${viaje}`)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}


controllers.inhabilitarviaje= async function(req,res){
    try {
        const {idviaje} = req.body;
        if(idviaje == "" || idviaje == null || idviaje == undefined || idviaje <= 0 ){
            res.send('err')
        }
        await sql.connect(db)
        var act = await sql.query(`SELECT activo FROM viajes WHERE idviaje = ${idviaje}`)
        if(act.recordset[0].activo === 1){
            sql.query(`UPDATE viajes SET activo = 0 WHERE idviaje = ${idviaje}`)
            res.sendStatus(200)
        }
        if(act.recordset[0].activo === 0){
            sql.query(`UPDATE viajes SET activo = 1 WHERE idviaje = ${idviaje}`)
            res.sendStatus(200)
        }

    } catch (error) {
        console.log(error);
    }
      
}

controllers.modificaviaje = async function(req,res){
    try {
        const {idviaje,rdesde,rhasta,cap,monto,hora} = req.body;
        await sql.connect(db)
        if(idviaje == "" || idviaje == null || idviaje == undefined || idviaje <= 0 ){
            return res.send('err')
        }
        if(rdesde == "" || rdesde == null || rdesde == undefined || rdesde <= 0 ){
            return res.send('err')
        }
        if(rhasta == "" || rhasta == null || rhasta == undefined || rhasta <= 0 ){
            return res.send('err')
        }
        if(cap == "" || cap == null || cap == undefined || cap <= 0 ){
            return res.send('err')
        }
        if(monto == "" || monto == null || monto == undefined || monto <= 0 ){
            return res.send('err')
        }
        if(hora == "" || hora == null || hora == undefined || hora > '23:00' || hora < '05:00' ){
            return res.send('err')
        }
        var request = new sql.Request();

        request
        .input('rdesde',sql.VarChar(50),rdesde)
        .input('rhasta',sql.VarChar(50),rhasta)
        .input('cap',sql.Int,cap)
        .input('monto',sql.Money,monto)
        .input('hora',hora)
        .query(`UPDATE viajes SET rutadesde = @rdesde, rutahasta = @rhasta, capacidad = @cap, monto = @monto WHERE idviaje = ${idviaje}`,[rdesde,rhasta,cap,monto,hora])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.send('err')
    }
      
}



setInterval(resetrutas, 1800000)
async function resetrutas(){

    let hoy = new Date;
    let hora = hoy.getHours();

    if(hora == '23' || hora == 23){
        await sql.connect(db)
        await sql.query(`UPDATE viajes SET fcapacidad = 0`)
    }
}





module.exports = controllers;