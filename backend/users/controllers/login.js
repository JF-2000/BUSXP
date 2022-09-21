const db = require("../../conection");
const sql = require('mssql');
const controllers = {};

controllers.login = async function(req,res){
    try {
        const {email,password} = req.body;
        await sql.connect(db)
        if(email!="" && password!=""){
            var log = await sql.query(`select * from usuarios where email = '${email}' and password = '${password}' and auth > 0`)
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

module.exports = controllers;