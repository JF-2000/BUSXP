const db = require("../../conection");
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

module.exports = controllers;