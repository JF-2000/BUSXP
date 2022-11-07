const db = require("../../conection");
const sql = require('mssql');
const mail = require('../../helpers/mailer')
const crypt = require('../../helpers/encript')
const controllers = {};

controllers.registrar = async function(req,res){
    try {
        const {nombre,email,password} = req.body;
        const passworden = await crypt.encriptar(password)
        await sql.connect(db)
        var verif = await sql.query(`select email from usuarios where email = '${email}'`)
    
        if(verif.recordset.length > 0){
            return res.send('errmail')
        }else{
            var request = new sql.Request();
    
            request
            .input('nombre',sql.VarChar(20),nombre)
            .input('email',sql.VarChar(40),email)
            .input('password',sql.VarChar(50),passworden)
            .query(`INSERT INTO usuarios (nombre,email,password) VALUES (@nombre,@email,@password)`,[nombre,email,passworden])
    
            var iduser = await sql.query(`SELECT iduser from usuarios where email = '${email}'`)
            const id = iduser.recordset[0].iduser
            await mail.verificaremail(email,nombre,id)
            res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
    }
}

controllers.nuevoU = async function(req,res){
    try {
        const {nombre,email,password,authlvl} = req.body;
        const passworden = await crypt.encriptar(password)
        await sql.connect(db)
        var verif = await sql.query(`select email from usuarios where email = '${email}'`)
    
        if(verif.recordset.length > 0){
            return res.send('errmail')
        }else{
            var request = new sql.Request();
    
            request
            .input('nombre',sql.VarChar(20),nombre)
            .input('email',sql.VarChar(40),email)
            .input('password',sql.VarChar(50),passworden)
            .input('authlvl',sql.Int,authlvl)
            .query(`INSERT INTO usuarios (nombre,email,password,auth) VALUES (@nombre,@email,@password,@authlvl)`,[nombre,email,passworden,authlvl])
    
            var iduser = await sql.query(`SELECT iduser from usuarios where email = '${email}'`)
            const id = iduser.recordset[0].iduser
            await mail.verificaremail(email,nombre,id)
            res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
    }
}


controllers.modificarU = async function(req,res){
    try {
        const {nombre,email,password,authlvl,iduser} = req.body;
        const passworden = await crypt.encriptar(password)
        await sql.connect(db)
        var verif = await sql.query(`select email from usuarios where email = '${email}'`)
    
        if(verif.recordset.length > 0){
            return res.send('errmail')
        }else{
            var request = new sql.Request();
    
            request
            .input('nombre',sql.VarChar(20),nombre)
            .input('email',sql.VarChar(40),email)
            .input('password',sql.VarChar(50),passworden)
            .input('authlvl',sql.Int,authlvl)
            .query(`UPDATE usuarios SET nombre = @nombre, email = @email, password = @password,  auth = @auth WHERE iduser = ${iduser}`,[nombre,email,passworden,authlvl])
    
            res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
    }
}

controllers.perfilmodif = async function(req,res){
    try {
        const {nombre,password,id} = req.body;
        const passworden = await crypt.encriptar(password)
        await sql.connect(db)
        var request = new sql.Request();

        request
        .input('nombre',sql.VarChar(20),nombre)
        .input('password',sql.VarChar(50),passworden)
        .query(`UPDATE usuarios SET nombre = @nombre, password = @password WHERE iduser = ${id}`,[nombre,passworden])
        res.sendStatus(200)
        
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