const db = require("../../conection");
const sql = require('mssql');
const { get } = require("../routes/choferes");
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

controllers.viajeschoferes = async function(req,res){
    try {
        const idchofer = req.params.idchofer;
        await sql.connect(db)
        var viajes = await sql.query(`SELECT idviaje, idchofer, rutadesde, rutahasta, v.capacidad, CONVERT(varchar,hora,0)hora 
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

module.exports = controllers;