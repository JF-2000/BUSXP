const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.verificarmail = async function(req ,res){
    try {
        const {iduser} = req.body
        await sql.connect(db)
        if(iduser == "" || iduser == null || iduser == undefined || iduser == 0){
            res.send('errid')
        }else{
            await sql.query(`UPDATE usuarios SET auth = 1 where iduser = ${iduser}`)
            res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = controllers;