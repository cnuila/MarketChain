var config = require('../config');
const sql = require('mssql');

async function getVentas(userId){
    try {
        let db = await sql.connect(config);
        let ventas = await db.request()
                .input("UserId",sql.Int, userId)
                .query("SELECT v.Id, v.UserIdComprador, v.ProductId, v.Fecha FROM Ventas as v INNER JOIN Productos as p ON v.ProductId = p.Id WHERE p.UserId = @UserId");
        return ventas.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getVenta(id){
    try{
        let db = await sql.connect(config);
        let venta = await db.request()
                .input('Id', sql.Int, id)
                .query("SELECT * FROM Ventas WHERE Id = @Id");
        return venta.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addVenta(venta){
    try{
        let db = await sql.connect(config);
        let now = new Date();
        let nuevaVenta = await db.request()
                .input('UserIdComprador', sql.Int, venta.UserIdComprador)
                .input('ProductId',sql.Int, venta.ProductId)
                .input('Fecha', sql.DateTime, now.toLocaleString('en-US'))
                .query("INSERT INTO Ventas([UserIdComprador],[ProductId],[Fecha]) VALUES (@UserIdComprador,@ProductId,@Fecha)");
        return nuevaVenta.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    addVenta,
    getVenta,
    getVentas,
}