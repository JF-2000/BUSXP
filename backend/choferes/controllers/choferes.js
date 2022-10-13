const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.allchoferes = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query("SELECT idchofer, nombre, apellido, direccion, identificacion, telefono FROM choferes")
        var data = choferes.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}

controllers.uchoferes = async function(req,res){
    try {
        await sql.connect(db)
        var choferes = await sql.query(`SELECT u.iduser, u.nombre, email, activo 
        FROM usuarios u 
		inner join choferes c on c.iduser != u.iduser
        WHERE auth = 3 and activo = 1`)
        var data = choferes.recordset
        res.send(data)
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
        var verificarid = await sql.query(`select cc.idchofer 
        from coordenadas_choferes cc inner join choferes c on c.idchofer = cc.idchofer 
        where iduser = ${id}`)
        return console.log(verificarid.recordset)
        
        await sql.connect(db)
        var request = new sql.Request();
        request
        .input('iduser',sql.Int,id)
        .input('latitude',sql.Float,latitude)
        .input('longitude',sql.Float,longitude)
        .query(`INSERT INTO usuarios (nombre,email,password) VALUES (@nombre,@email,@password)`,[nombre,email,password])
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


module.exports = controllers;