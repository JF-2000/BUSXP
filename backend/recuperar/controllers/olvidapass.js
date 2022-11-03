const db = require("../../conection");
const sql = require('mssql');
const crypt = require('../../helpers/encript')
const mail = require('../../helpers/mailer')
const controllers = {};

controllers.rescontra = async function(req,res){
    try {
        const {key,password} = req.body;
        if(key == "" || key == null || key == undefined || key == 0){
            res.send('err')
        }
        console.log(key)
        var user = await crypt.desencriptar(key);
        const passworden = await crypt.encriptar(password)
        await sql.connect(db)
        var request = new sql.Request();
        request
        .input('password',sql.VarChar(50),passworden)
        .query(`UPDATE usuarios SET password = @password WHERE iduser = ${user}`,[passworden])
        res.sendStatus(200)
    } catch (error) {
        res.send('err')
        console.log(error)
    }
}

controllers.olvida = async function(req,res){
    try {
        const {email} = req.body;
        await sql.connect(db)
        if(email!=""){
            var log = await sql.query(`select iduser, email from usuarios where email = '${email}'`)
            var data = log.recordset 
            if(data.length <= 0){
                res.send('err')
            }else if(data.length > 0){
                var key = await crypt.encriptar(data[0].iduser)
                mail.recuperarcuenta(key,data[0].email)
                res.sendStatus(200)
            }
        }else{
            res.send('err')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers;