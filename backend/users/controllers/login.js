const db = require("../../conection");
const sql = require('mssql');
const crypt = require('../../helpers/encript')
const controllers = {};

controllers.login = async function(req,res){
    try {
        const {email,password} = req.body;
        const passworden = await crypt.encriptar(password)
        await sql.connect(db)
        if(email!="" && password!=""){
            var log = await sql.query(`select * from usuarios where email = '${email}' and password = '${passworden}' and auth > 0`)
            var data = log.recordset
            if(data.length <= 0){
                res.send('err')
            }else{
                res.send(data)
            }
        }else{
            res.send('err')
        }
    } catch (error) {
        console.log(error)
    }
}

controllers.encriptop = async function(req,res){
    try {
        // const {password} = req.body;
        var data = {};
        var passen = await crypt.encriptar(1234);
        var passdes = await crypt.desencriptar(passen);
        data = {
            encriptado: passen,
            desencriptado: passdes
        }
        console.log(data)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }


}


module.exports = controllers;