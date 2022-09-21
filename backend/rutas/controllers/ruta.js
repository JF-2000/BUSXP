const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.allruta = async function(req,res){
    try {
        await sql.connect(db)
        var rutas = await sql.query("SELECT * FROM rutas")
        var data = rutas.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}

controllers.rutaxid = async function(req,res){
    try {
        const id = req.params.idruta;
        await sql.connect(db)
        var ruta = await sql.query(`SELECT * FROM rutas WHERE idruta = ${id}`)
        data = ruta.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}

controllers.crearuta = async function(req,res){
    try {
        const {rdesde,rhasta,cap,monto} = req.body;
        if(idruta == "" || idruta == null || idruta == undefined || idruta <= 0 ){
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
        await sql.connect(db)
        var request = new sql.Request();

        request
        .input('rdesde',sql.VarChar(50),rdesde)
        .input('rhasta',sql.VarChar(50),rhasta)
        .input('cap',sql.Int,cap)
        .input('monto',sql.Money,monto)
        .query(`INSERT INTO rutas (rutadesde, rutahasta, capacidad, monto) VALUES (@rdesde,@rhasta,@cap,@monto)`,[rdesde,rhasta,cap,monto])
        res.sendStatus(200)
    } catch (error) {
        res.send('err')
        console.log(error);
    }
      
}

controllers.modificaruta = async function(req,res){
    try {
        const {idruta,rdesde,rhasta,cap,monto} = req.body;
        await sql.connect(db)
        if(idruta == "" || idruta == null || idruta == undefined || idruta <= 0 ){
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
        var request = new sql.Request();

        request
        .input('rdesde',sql.VarChar(50),rdesde)
        .input('rhasta',sql.VarChar(50),rhasta)
        .input('cap',sql.Int,cap)
        .input('monto',sql.Money,monto)
        .query(`UPDATE rutas SET rutadesde = @rdesde, rutahasta = @rhasta, capacidad = @cap, monto = @monto WHERE idruta = ${idruta}`,[rdesde,rhasta,cap,monto])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.send('err')
    }
      
}

controllers.inhabilitarruta = async function(req,res){
    try {
        const {idruta} = req.body;
        if(idruta == "" || idruta == null || idruta == undefined || idruta <= 0 ){
            res.send('err')
        }
        await sql.connect(db)
        var act = await sql.query(`SELECT activo FROM rutas WHERE idruta = ${idruta}`)
        if(act.recordset[0].activo === 1){
            sql.query(`UPDATE rutas SET activo = 0 WHERE idruta = ${idruta}`)
            res.sendStatus(200)
        }
        if(act.recordset[0].activo === 0){
            sql.query(`UPDATE rutas SET activo = 1 WHERE idruta = ${idruta}`)
            res.sendStatus(200)
        }

    } catch (error) {
        console.log(error);
    }
      
}


module.exports = controllers;