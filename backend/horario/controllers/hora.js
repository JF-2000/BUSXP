const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.allhorarios = async function(req,res){
    try {
        await sql.connect(db)
        var horarios = await sql.query("SELECT idhorario, CONVERT(varchar,hora,0)hora , activo FROM horarios")
        var data = horarios.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
      
}

controllers.horariolist = async function(req,res){
    try {
        await sql.connect(db)
        var horarios = await sql.query(`SELECT idhorario, CONVERT(varchar,hora,0)hora FROM horarios
        WHERE CONVERT(time,hora,108) >= CONVERT(time,SYSDATETIME(),108) and activo = 1
        ORDER BY CONVERT(time,hora,108)`)
        var data = horarios.recordset
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}

// controllers.horaioxid = async function(req,res){
//     try {
//         const id = req.params.idhorario;
//         await sql.connect(db)
//         var horario = await sql.query(`SELECT * FROM horarios WHERE idruta = ${id}`)
//         data = horario.recordset
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//     }
// }


controllers.horarioidA = async function(req,res){
    try {
        const idhorario = req.params.idhorario;
        await sql.connect(db)
        var horario = await sql.query(`SELECT idhorario, CONVERT(varchar,hora,8)hora FROM horarios`)
        var data = horario.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


controllers.creahorario = async function(req,res){
    try {
        const {rhora} = req.body;

        if(rhora == "" || rhora == null || rhora == undefined){
            return res.send('err')
        }

        await sql.connect(db)
        var request = new sql.Request();

        request
        .input('rhora',sql.VarChar(50),rhora)
        .query(`INSERT INTO horarios (hora) VALUES (@rhora)`,[rhora])
        res.sendStatus(200)
    } catch (error) {
        res.send('err')
        console.log(error);
    }
      
}

controllers.modificahorario = async function(req,res){
    try {
        const {idhorario,hora} = req.body;
        await sql.connect(db)
        if(idhorario == "" || idhorario == null || idhorario == undefined || idhorario <= 0 ){
            return res.send('err')
        }
        if(hora == "" || hora == null || hora == undefined || hora <= 0 ){
            return res.send('err')
        }
        var request = new sql.Request();

        request
        .input('hora',sql.VarChar(50),hora)
        .query(`UPDATE horarios SET hora = @hora WHERE idhorario = ${idhorario}`,[hora])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.send('err')
    }
      
}

controllers.inhabilitarhorario = async function(req,res){
    try {
        const {idhorario} = req.body;
        if(idhorario == "" || idhorario == null || idhorario == undefined || idhorario <= 0 ){
            res.send('err')
        }
        await sql.connect(db)
        var act = await sql.query(`SELECT activo FROM horarios WHERE idhorario = ${idhorario}`)
        if(act.recordset[0].activo === 1){
            sql.query(`UPDATE horarios SET activo = 0 WHERE idhorario = ${idhorario}`)
            res.sendStatus(200)
        }
        if(act.recordset[0].activo === 0){
            sql.query(`UPDATE horarios SET activo = 1 WHERE idhorario = ${idhorario}`)
            res.sendStatus(200)
        }

    } catch (error) {
        console.log(error);
    }
      
}

module.exports = controllers;