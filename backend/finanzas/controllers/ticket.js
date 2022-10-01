const db = require("../../conection");
const currency = require('../../helpers/currency');
const sql = require('mssql');
const controllers = {};

controllers.pagoticket = async function(req,res){
    try {
        const {idviaje,personas,iduser,idpay,total} = req.body
        if(iduser==null||iduser==undefined||iduser==""){
            return res.send('nouser');
        }
        if(idviaje==null||idviaje==undefined||idviaje==""){
            return res.send('noviaje');
        }
        await sql.connect(db)
        var request = new sql.Request();
    
        request
        .input('idviaje',sql.Int,idviaje)
        .input('iduser',sql.Int,iduser)
        .input('personas',sql.Int,personas)
        .input('credencial',sql.Text,idpay)
        .input('total',sql.Money,total)
        .query(`INSERT INTO tickets (idviaje,iduser,personas,credencial,total,fecha) VALUES (@idviaje,@iduser,@personas,@credencial,@total,SYSDATETIME())`,[idviaje,iduser,personas,idpay,total])
        res.sendStatus(200)  
    } catch (error) {
        console.log(error)
    }
}

controllers.usatodop = async function(req,res){
    try {
        await sql.connect(db)
        var current = await sql.query('SELECT valor FROM currency where idcurrent = 1')
        var data = current.recordset[0];
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

async function actcurrency(){
    await sql.connect(db)
}

module.exports = controllers;