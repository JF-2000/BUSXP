const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.allchoferes = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT idchofer, nombre, apellido, direccion, identificacion, telefono 
        FROM choferes WHERE activo = 1 `)
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}

controllers.uchoferes = async function(req,res){
    try {
        var LTAN = [];
        var LCHO = [];
        var LCHO2 = [];
        var filtro = [];
        var data = [];
        await sql.connect(db)
        var verifchofer = await sql.query(`SELECT iduser from choferes`)
        verifchofer.recordset.forEach(verif => {
            LTAN.push(verif.iduser)
        })

        var choferes = await sql.query(`select iduser, email from usuarios where auth = 3`)
        choferes.recordset.forEach(cho => {
            LCHO.push(cho.iduser)
            LCHO2.push(cho.iduser,cho.email)
        })

        for(x=0; x < LCHO.length; x++){
            if(LTAN.includes(LCHO[x]) == true){
                continue
            }
            if(LTAN.includes(LCHO[x]) == false){
                if(filtro.includes[LCHO[x]] == true){
                    continue
                }else{
                    filtro.push(LCHO[x])
                }
            }
        }

        filtro.forEach(filt =>{
            var indx = LCHO2.indexOf(filt)
            data.push({
                iduser: LCHO2[indx], 
                email:LCHO2[indx+1]
            })
        })

        console.log(data)
        res.sendStatus(200)
        

    } catch (error) {
        console.log(error);
    }
      
}


controllers.registrarchofer = async function(req,res){
    try {
        const {iduser,nombre,apellido,direccion,cedula,telefono} = req.body;
        await sql.connect(db)
        if(iduser == "" || iduser == null || iduser == undefined || iduser <= 0 ){
            return res.send('err')
        }
        if(nombre == "" || nombre == null || nombre == undefined || nombre <= 0 ){
            return res.send('err')
        }
        if(apellido == "" || apellido == null || apellido == undefined || apellido <= 0 ){
            return res.send('err')
        }
        if(direccion == "" || direccion == null || direccion == undefined || direccion <= 0 ){
            return res.send('err')
        }
        if(cedula == "" || cedula == null || cedula == undefined || cedula <= 0 ){
            return res.send('err')
        }
        if(telefono == "" || telefono == null || telefono == undefined || telefono <= 0 ){
            return res.send('err')
        }
        
        var request = new sql.Request();
    
        request
        .input('iduser',sql.VarChar(40),iduser)
        .input('nombre',sql.VarChar(40),nombre)
        .input('apellido',sql.VarChar(50),apellido)
        .input('direccion',sql.VarChar(50),direccion)
        .input('cedula',sql.VarChar(50),cedula)
        .input('telefono',sql.VarChar(50),telefono)
        .query(`INSERT INTO choferes (iduser,nombre,apellido,direccion,identificacion,telefono) VALUES (@iduser,@nombre,@apellido,@direccion,@cedula,@telefono)`,[iduser,nombre,apellido,direccion,cedula,telefono])
        res.sendStatus(200)
        }catch (error) {
            console.log(error);
            res.send('err')
        }
}


controllers.viajeschoferes = async function(req,res){
    try {
        const idchofer = req.params.idchofer;
        await sql.connect(db)
        var viajes = await sql.query(`SELECT idviaje, v.idhorario, idchofer, rutadesde, rutahasta, v.capacidad, CONVERT(varchar,hora,0)hora 
        FROM viajes v
        inner join rutas r on r.idruta = v.idruta 
        inner join horarios h on h.idhorario = v.idhorario
        WHERE v.activo = 1 and idchofer = 0 or idchofer = ${idchofer}`)
        var data = viajes.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

controllers.asignarviajes = async function(req,res){
    try {
        const {id,viajes} = req.body;
        var arrayD = [];
        await sql.connect(db)
        var viajesC = await sql.query(`SELECT idviaje FROM viajes WHERE idchofer = ${id}`)
        var getviajes = viajesC.recordset
        if(getviajes.length > 0){

            getviajes.forEach(e=>{
                if(viajes.includes(e.idviaje)!=true){
                    arrayD.push(e.idviaje)
                }
            });
            for(i = 0; i < arrayD.length; i++){
                await sql.query(`UPDATE viajes SET idchofer = 0
                WHERE idviaje = ${arrayD[i]}`)
            }

            for(x = 0; x < viajes.length; x++){
                if(getviajes.includes(viajes[x])!=true){
                    await sql.query(`UPDATE viajes SET idchofer = ${id} 
                    WHERE idviaje = ${viajes[x]}`)
                }
            }
            
        }else if(getviajes.length <= 0){
            for(x = 0; x < viajes.length; x++){
                await sql.query(`UPDATE viajes SET idchofer = ${id} 
                WHERE idviaje = ${viajes[x]}`)
            }
        }

        res.send(200)
        
    } catch (error) {
        console.error(error)
    }
}

controllers.misviajes = async function(req,res){
    try {
        const idchofer = req.params.idchofer;
        await sql.connect(db)
        var viajes = await sql.query(`SELECT idviaje, v.monto, rutadesde, rutahasta, v.capacidad, v.fcapacidad, CONVERT(varchar,hora,0)hora 
        FROM viajes v
        inner join rutas r on r.idruta = v.idruta 
        inner join horarios h on h.idhorario = v.idhorario
        inner join choferes c on c.idchofer = v.idchofer
        WHERE v.activo = 1 and iduser = ${idchofer}`)
        var data = viajes.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

controllers.ubicacion = async function(req,res){
    try {
        const {id,latitude, longitude} = req.body;    
        await sql.connect(db)
        var reidchofer = await sql.query(`select idchofer from choferes where iduser = ${id} and activo = 1`)
        if(reidchofer.recordset.length <= 0 ){
            return res.send('err')
        }
        var idchofer = reidchofer.recordset[0].idchofer
        var verificarid = await sql.query(`select idchofer 
        from coordenadas_choferes where idchofer = ${idchofer}`)
        if(verificarid.recordset.length <= 0){
            var request = new sql.Request();
            request
            .input('idchofer',sql.Int,idchofer)
            .input('latitude',sql.Float,latitude)
            .input('longitude',sql.Float,longitude)
            .query(`INSERT INTO coordenadas_choferes (idchofer,latitude,longitude) VALUES (@idchofer,@latitude,@longitude)`,[idchofer,latitude,longitude])
            return res.sendStatus(200)
        }else if(verificarid.recordset.length > 0){
            var request = new sql.Request();
            request
            .input('idchofer',sql.Int,idchofer)
            .input('latitude',sql.Float,latitude)
            .input('longitude',sql.Float,longitude)
            .query(`UPDATE coordenadas_choferes SET latitude = @latitude, longitude = @longitude`,[latitude,longitude])
            return res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = controllers;