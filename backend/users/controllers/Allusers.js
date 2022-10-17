const db = require("../../conection");
const sql = require('mssql');
const crypt = require('../../helpers/encript')
const controllers = {};

controllers.Allusers = async function(req,res){
    try {
        await sql.connect(db)
        var usuarios = await sql.query(`SELECT * FROM usuarios`)
        var data = usuarios.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}
controllers.inhabilitaruser = async function(req,res){
    try {
        const {iduser} = req.body;
        if(iduser == "" || iduser == null || iduser == undefined || iduser <= 0 ){
            res.send('err')
        }
        await sql.connect(db)
        var act = await sql.query(`SELECT activo FROM usuarios WHERE iduser = ${iduser}`)
        if(act.recordset[0].activo === 1){
            sql.query(`UPDATE usuarios SET activo = 0 WHERE iduser = ${iduser}`)
            res.sendStatus(200)
        }
        if(act.recordset[0].activo === 0){
            sql.query(`UPDATE usuarios SET activo = 1 WHERE iduser = ${iduser}`)
            res.sendStatus(200)
        }

    } catch (error) {
        console.log(error);
    }
      
}


module.exports = controllers;