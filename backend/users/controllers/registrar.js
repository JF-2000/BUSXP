const db = require("../../conection");
const sql = require('mssql');
const mail = require('../../helpers/mailer')
const controllers = {};

controllers.registrar = async function(req,res){
    try {
        const {nombre,email,password} = req.body;

        await sql.connect(db)
        var verif = await sql.query(`select email from usuarios where email = '${email}'`)
    
        if(verif.recordset.length > 0){
            return res.send('errmail')
        }else{
            var request = new sql.Request();
    
            request
            .input('nombre',sql.VarChar(20),nombre)
            .input('email',sql.VarChar(40),email)
            .input('password',sql.VarChar(50),password)
            .query(`INSERT INTO usuarios (nombre,email,password) VALUES (@nombre,@email,@password)`,[nombre,email,password])
    
            var iduser = await sql.query(`SELECT iduser from usuarios where email = '${email}'`)
            const id = iduser.recordset[0].iduser
            await mail.verificaremail(email,nombre,id)
            res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
    }
}

controllers.usuarios = async function(req,res){
    try {
        await sql.connect(db)
        var usuarios = await sql.query('select * from usuarios')
        data = usuarios.recordset
        res.send(data)
    } catch (error) {
        console.log(error)
    }

    
}

module.exports = controllers;