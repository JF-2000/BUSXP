const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.verificarmail = async function(req ,res){
    const {iduser} = req.body
    await sql.connect(db)
    if(iduser == "" || iduser == null || iduser == undefined || iduser == 0){
        res.send('errid')
    }else{
        await sql.query(`UPDATE usuarios SET auth = 1 where iduser = ${iduser}`)
        res.sendStatus(200)
    }
}

module.exports = controllers;